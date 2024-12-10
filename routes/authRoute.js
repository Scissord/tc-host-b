import express from "express";
import * as controller from '#controllers/authController.js';

const router = express.Router();

router.post("/signup", controller.signup);

router.post("/login", controller.login);

router.post("/logout", controller.logout);

export default router;
