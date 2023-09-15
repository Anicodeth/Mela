import Campaign from "./model.js";
import AppError from "../../utils/appError.js";
import axios from "axios";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"
import config from "../../config.js";
import generateDateBasedId from "../../utils/dateBasedIdGenerator.js";

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
    const campaign = await Campaign.findById(req.params.id)

    res.status(200).json({
        success: true,
        data: campaign,
    });
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
            "return_url": "http://localhost:4200",
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

export default {
    createCampaign,
    getCampaign,
    getAllCampaign,
    editCampaign,
    deleteCampaign,
    chapaPayment,
    verifyPayment,
};