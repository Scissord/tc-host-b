import express from "express";
import * as controller from '#controllers/statusController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_statuses' }, checkAbility), controller.get);
router.post("", withExtraData({ ability_name: 'create_statuses' }, checkAbility), controller.create);
router.patch("/:status_id", withExtraData({ ability_name: 'update_statuses' }, checkAbility), controller.update);
router.delete("/:status_id", withExtraData({ ability_name: 'delete_statuses' }, checkAbility), controller.softDelete);

export default router;
