import express from "express";
import * as controller from '#controllers/orderColumnController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", controller.get);

export default router;
