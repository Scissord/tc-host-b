import express from "express";
import * as controller from '#controllers/authController.js';

const router = express.Router();

router.post("/admin", controller.adminSignIn);
router.post("/webmaster", controller.webmasterSignIn);
router.post("/operator", controller.operatorSignIn);

router.post("/logout", controller.logout);

export default router;
