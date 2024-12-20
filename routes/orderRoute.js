import express from "express";
import * as controller from '#controllers/orderController.js';

const router = express.Router();

router.get("", controller.getOrders);
router.get("/:order_id", controller.getOrder);
router.patch("/update_status", controller.changeStatus);

export default router;
