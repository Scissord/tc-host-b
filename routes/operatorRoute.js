import express from "express";
import * as controller from '#controllers/operatorController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("/free", withExtraData({ ability_name: 'get_free_operators' }, checkAbility), controller.getFree);
router.patch("/:operator_id", withExtraData({ ability_name: 'update_operators' }, checkAbility), controller.update);

export default router;
