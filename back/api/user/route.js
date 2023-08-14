
import express from "express";
const router = express.Router();
import protect from "../protect/index.js";
import authorize from "../authorize/index.js";

import userController from "./controller.js";

router.route("/")
        .post(userController.register)
        .get(protect, userController.getMe)

router.route("/:id")
        .delete(protect, userController.deleteUser);

router.route("/login")
        .post(userController.login);

router.route("/changePassword")
        .post(protect, userController.changePassword);
router.route("/all")
        .get(userController.getAllUsers);

router.route("/update/:id")
        .put(userController.editUser);

module.exports = router;