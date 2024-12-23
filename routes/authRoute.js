import express from "express";
import * as controller from '#controllers/authController.js';

const router = express.Router();

router.post("/login", controller.signin);

router.post("/logout", controller.logout);

router.post("/refresh", controller.refresh);

export default router;
