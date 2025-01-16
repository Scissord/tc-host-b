import express from "express";
import * as controller from '#controllers/ketController.js';

const router = express.Router();

router.get("", controller.sendAcceptedOrders);

export default router;
