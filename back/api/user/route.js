
import express from "express"
const router = express.Router();
import protect from "../protect/index.js";

import userController from "./controller.js";


router.route("/")
    .get(userController.getAllUsers);

router.route("/register")
    .post(userController.register)

router.route("/:id")
    .get(userController.getUser)
    .delete(protect, userController.deleteUser);

router.route("/login")
        .post(userController.login);

router.route("/changePassword")
        .post(protect, userController.changePassword);

router.route("/update/:id")
        .put(userController.editUser);

export default router;