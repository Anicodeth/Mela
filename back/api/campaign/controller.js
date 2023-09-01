import Campaign from "./model.js";
import AppError from "../../utils/appError.js";

//create a campaign
const createCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.create(req.body);

        return res.status(201).json({
            success: true,
            data: campaign,
        });
    } catch (error) {
        next(new AppError("Server error", 500));
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
        console.log(req)
        const campaigns = await Campaign.find();
        console.log(campaigns)

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
        delete req.body.password;

        const campaign = await Campaign.findById(req.body.id);
        if (!campaign){
            return next(new AppError("There is no user with the specified id", 400));
        }

        const newOne = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
            runValidators: true,
            new: true,
        });

        return res.status(200).json({
            success: true,
            data: newOne,
        });

    } catch (error) {
        console.log(error);
        next(new AppError("server error", 500));
    }
};

export default {
    createCampaign,
    getCampaign,
    getAllCampaign,
    editCampaign,
    deleteCampaign
};
