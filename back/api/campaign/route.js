
import express from "express";
const router = express.Router();
import protect from "../protect/index.js";

import campaignController from "./controller.js";

router.route("/")
    .post(campaignController.createCampaign);

router.route("/:id")
    .get(campaignController.getCampaign);

router.route("/:id")
    .delete(protect, campaignController.deleteCampaign);

router.route("/")
    .get(campaignController.getAllCampaign);

router.route("/update/:id")
    .patch(campaignController.editCampaign);

export default router;