import express from "express";
import * as controller from '#controllers/statisticController.js';
import checkAbility from "#middleware/checkAbility.js";
import withExtraData from "#middleware/withExtraData.js";

const router = express.Router();

router.post("/webmaster", withExtraData({ ability_name: 'get_webmaster_statistic' }, checkAbility), controller.getStatisticForWebmaster);
router.post("/operator", withExtraData({ ability_name: 'get_operator_statistic' }, checkAbility), controller.getStatisticForOperator);

export default router;
