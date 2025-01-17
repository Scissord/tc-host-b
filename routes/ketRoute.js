import express from "express";
import * as controller from '#controllers/ketController.js';

const router = express.Router();

router.post("", controller.sendAcceptedOrders);
router.post("/dvd", controller.sendCourierOrder);

export default router;
