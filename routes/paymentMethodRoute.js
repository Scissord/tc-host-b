import express from "express";
import * as controller from '#root/controllers/paymentMethodController.js';

const router = express.Router();

router.get("", controller.get);

export default router;
