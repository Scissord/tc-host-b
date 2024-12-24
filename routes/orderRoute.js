import express from "express";
import * as controller from '#controllers/orderController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";
import checkEntity from "#middleware/checkEntity.js";

const router = express.Router();

router.get("/user", withExtraData({ ability_name: 'get_orders' }, checkAbility), controller.getUserOrders);
router.get("/webmaster", withExtraData({ entity: 'webmaster' }, checkEntity), controller.getWebmasterOrders);
router.get("/operator", withExtraData({ entity: 'operator' }, checkEntity), controller.getOperatorOrders);
router.get("/:order_id", withExtraData({ ability_name: 'get_order_orders' }, checkAbility), controller.getOrder);
router.patch("/update_status", controller.changeStatus);

export default router;
