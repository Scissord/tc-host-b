import express from "express";
import * as controller from '#controllers/ketController.js';

const router = express.Router();

router.get("/orderInfo", controller.getSendedOrderInfo);

export default router;
