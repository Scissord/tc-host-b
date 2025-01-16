import express from "express";
import * as controller from '#controllers/ketController';

const router = express.Router();

router.get("", controller.sendAcceptedOrders);

export default router;
