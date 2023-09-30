
import express from "express";
const router = express.Router();
import protect from "../protect/index.js";
import upload from "../../utils/fileUploader.js";

import campaignController from "./controller.js";

router.route("/")
    .get(campaignController.getAllCampaign);

router.route("/")
    .post( upload.single("image"), campaignController.createCampaign);

router.route("/campaign/:id")
    .get(campaignController.getCampaign);

router.route("/search")
    .get(campaignController.searchCampaign);

router.route("/:id")
    .delete(protect, campaignController.deleteCampaign);

router.route("/:id")
    .patch(campaignController.editCampaign);

router.route("/:id/payment")
    .post(campaignController.chapaPayment);

router.route("/:id/verify")
    .post(campaignController.verifyPayment)
    .get(campaignController.verifyPayment);

router.route("/banks")
    .get(campaignController.getBanks)

router.route("transfer:user_id")
    .post(campaignController.transferToAccount)

export default router;