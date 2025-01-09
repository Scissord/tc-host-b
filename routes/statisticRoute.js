import express from "express";
import * as controller from '#controllers/statisticController.js';
import checkAbility from "#middleware/checkAbility.js";
import withExtraData from "#middleware/withExtraData.js";

const router = express.Router();

router.get("/user", withExtraData({ ability_name: 'user_statistics' }, checkAbility), controller.getUserStatistic);
router.get("/webmaster", withExtraData({ ability_name: 'webmaster_statistics' }, checkAbility), controller.getWebmasterStatistic);
router.get("/operator", withExtraData({ ability_name: 'operator_statistics' }, checkAbility), controller.getOperatorStatistic);

export default router;
