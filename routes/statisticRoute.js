import express from "express";
import * as controller from '#controllers/statisticController.js';
import checkAbility from "#middleware/checkAbility.js";
import withExtraData from "#middleware/withExtraData.js";

const router = express.Router();

router.get("/user", withExtraData({ ability_name: 'user_statistics' }, checkAbility), controller.getUserStatistic);
router.get("/webmaster", controller.getWebmasterStatistic);
router.get("/operator", controller.getOperatorStatistic);

export default router;
