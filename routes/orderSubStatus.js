import express from "express";
import * as controller from '#controllers/orderSubStatusController.js';

const router = express.Router();

router.get("", controller.getOrderSubStatuses);

export default router;
