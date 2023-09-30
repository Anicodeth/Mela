import Campaign from "./model.js";
import AppError from "../../utils/appError.js";
import axios from "axios";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import config from "../../config.js";
import generateDateBasedId from "../../utils/dateBasedIdGenerator.js";
import {initializeApp} from "firebase/app";
import User from "../user/model.js";

initializeApp(config.firebaseConfig)

const storage = getStorage();

//create a campaign
const createCampaign = async (req, res, next) => {
    try {

        const storageRef = ref(storage, `images/campaignImages/${req.file.originalname + "-" + generateDateBasedId()} `)
        const metadata = {
            contentType: req.file.mimetype,
        }
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const uploadUrl = await getDownloadURL(snapshot.ref);

        req.body.tags = req.body.tags.map(tag => JSON.parse(tag));

        const campaign = await Campaign.create(
            {
                ...req.body,
                imageUrl: uploadUrl,
                donatedMoney: 0,
                isOpen: true,
            }
            );

        return res.status(201).json({
            success: true,
            data: campaign,
        });
    } catch (error) {
        next(new AppError("ValidationError", "validation failed for a field", 400));

    }
};

//  get one campaign by id
const getCampaign = async (req, res, next) => {
    try{
        const campaign = await Campaign.findById(req.params.id)

        if (campaign){

            const creator = await User.findById(campaign.creatorId);

            const relatedCampaigns = await Campaign.find({creatorId: campaign.creatorId}).limit(3)

            res.status(200).json({
                success: true,
                data: {
                    ...campaign._doc,
                    creator,
                    relatedCampaigns,
                },
            });
        }else{
            res.status(404).json({
                success: false,
                message:"no campaign found"
            })

        }


    }catch(error){
        next(new AppError("failed to load campaign", "the campaign you are looking for can't be found", 400))
    }
};

//  get getAllCampaign
const getAllCampaign = async (req, res) => {
    try{
        const campaigns = await Campaign.find();

        res.status(200).json({
            success: true,
            data: campaigns,
        });
    } catch (error){
       res.status(500).json({success: false})
    }
};

const searchCampaign = async (req, res, next) => {
    try{

        const searchRegex = new RegExp(req.query.keyword, 'i')

        const campaigns = await Campaign.find({title: {$regex: searchRegex}})

        res.status(200).json({
            success: true,
            data: campaigns
        })

    }catch(error){
        next(new AppError("Search failed", "searching for campaigns failed", 500))
    }
}

// delete campaign
const deleteCampaign = async (req, res, next) => {
    try {
        await Campaign.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
        });
    } catch (error) {
        next(new AppError("server error", 500));
    }
};

// edit a campaign
const editCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.body.id);
        if (!campaign){
            return next(new AppError("There is no campaign with the specified id", 400));
        }

        const newOne = await Campaign.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                runValidators: true,
                new: true,
            }
            );

        return res.status(200).json({
            success: true,
            data: newOne,
        });

    } catch (error) {
        console.log(error);
        next(new AppError("server error", 500));
    }
};

//initialize the payment
const chapaPayment = async (req, res, next) => {
    try{

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.chapa_secret_key}`
        }

        const {comment, visibility, ...otherInfo} = req.body;

        const tx_ref = otherInfo.first_name + otherInfo.last_name + generateDateBasedId();

        const data = {
            ...otherInfo,
            "tx_ref": tx_ref,
            "callback_url": `http://localhost:3000/api/v1/campaigns/${req.params.id}/verify?visibility=${visibility}`,
            "return_url": `http://localhost:4200/campaign/${req.params.id}`,
            "customization[title]": "Payment for a Campaign",
            "customization[description]": comment,
        }

        const result = await axios.post(
            "https://api.chapa.co/v1/transaction/initialize",
            data,
            {headers}
        )

        if (result.data.status === "success"){
            res.status(200).json(result.data)
        }else{
            res.status(400).json(result.data)
        }
    }catch(error){
        next(new AppError("payment failed", error.message, 400))
    }

}


//verifying the payment done on chapa with callback query sent by chapa's api
const verifyPayment = async (req, res, next)=>{
    try{
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.chapa_secret_key}`
        }

        const { callback, visibility, status, trx_ref } = req.query;

        //make a request to verify the transaction is true
        const result = await axios.get(
            `https://api.chapa.co/v1/transaction/verify/${trx_ref}`,
            {headers}
        )

        //if the transaction is verified to be true add it to the campaign's donations sub_collection
        if (result.data.status === "success"){

            const newDonation = {
                ...result.data.data,
                visibility: Boolean(visibility)
            }

            const updatedCampaign = await Campaign.findByIdAndUpdate(
                req.params.id,
                {
                    $push: {donations: newDonation},
                    $inc: {donatedMoney: newDonation.amount}
                },
                {new: true}
            )

            await User.findByIdAndUpdate(
                updatedCampaign.creatorId,
                {
                    $inc: {currentBalance: newDonation.amount}
                }
            )



            res.status(204).json({
                success: true,
                data: updatedCampaign
            })

        }else{
            console.log("error :", "payment failed")
            next(new AppError("payment failed", "the payment done could not be verified", 400));
        }

    }catch(err){
        console.log("error message", err.message)
        next(new AppError("payment failed", err.message, 500))
    }
}

const getBanks = async (req, res, next)=>{

    try{
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.chapa_secret_key}`
        }

        //make a request to get the list of Banks
        const result = await axios.get(
            `https://api.chapa.co/v1/banks`,
            {headers}
        )

        res.status(200).json({
            success: true,
            data: result.data.data
        })

    }catch(error){
        next(new AppError("error", "loading banks failed", 500))
    }
}

const transferToAccount = async(req, res, next)=>{
    try{
        const body = req.body;

        //extract the user's information
        const user = await User.findById(req.params.user_id)

        if (!user){
            res.status(404).json({
                success: false,
                message: "no user found with the provided id"
            })
        }

        if (user.currentBalance <= body.amount) {
            res.status(400).json({
                success: false,
                message: "Insufficient Balance"
            })
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.chapa_secret_key}`
        }

        var data = JSON.stringify({
            "account_name": body.account_name,
            "account_number": body.account_number,
            "amount": body.amount,
            "currency": "ETB",
            "beneficiary_name": user.firstName + user.lastName,
            "reference": user.firstName + user.lastName + generateDateBasedId(),
            "bank_code": body.bank_code
        });

        //make a request to queue the transfer
        const result = await axios.post(
            `https://api.chapa.co/v1/transfers`,
            data,
            {headers}
        )

        if (result.data.status === "success"){

            const user = await user.findByIdAndUpdate(
                req.params.user_id,
                {
                    $inc: {currentBalance: -1*body.amount}
                }
                )

            res.status(201).json({
                success: true,
                data: result.data
            })

        }else{
            res.status(400).join({
                success: false,
                data: result.data
            })
        }

    }catch(error){
        next(new AppError("error on transfer", error.message, 500))
    }
}



export default {
    createCampaign,
    getCampaign,
    getAllCampaign,
    editCampaign,
    deleteCampaign,
    chapaPayment,
    verifyPayment,
    searchCampaign,
    getBanks,
    transferToAccount
};