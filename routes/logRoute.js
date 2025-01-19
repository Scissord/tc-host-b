import express from "express";
import * as controller from '#controllers/logController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("/orders/:order_id", withExtraData({ ability_name: 'get_orders' }, checkAbility), controller.getOrderLogs);
router.get("/operators/:operator_id", withExtraData({ ability_name: 'get_orders' }, checkAbility), controller.getOperatorLogs);
router.get("/webmasters/:webmaster_id", withExtraData({ ability_name: 'get_orders' }, checkAbility), controller.getWebmasterLogs);

export default router;
