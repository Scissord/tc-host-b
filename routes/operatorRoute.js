import express from "express";
import * as controller from '#controllers/operatorController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", controller.get);
router.get("/free", controller.getFree);
router.post("", withExtraData({ ability_name: 'create_operators' }, checkAbility), controller.create);
router.patch("/:operator_id", withExtraData({ ability_name: 'update_operators' }, checkAbility), controller.update);
router.delete("/:operator_id", withExtraData({ ability_name: 'delete_operators' }, checkAbility), controller.softDelete);

export default router;
