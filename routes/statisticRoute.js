import express from "express";
import * as controller from '#controllers/statisticController.js';
import checkAbility from "#middleware/checkAbility.js";
import withExtraData from "#middleware/withExtraData.js";

const router = express.Router();
// withExtraData({ ability_name: 'user_statistics' }, checkAbility)
router.get("/user", controller.getUserStatistic);
router.get("/webmaster", controller.getWebmasterStatistic);
router.get("/operator", controller.getOperatorStatistic);
router.post("/file", controller.uploadFileForStatistic);
router.get("/hundred", controller.fromHundredThousand);
export default router;
