import express from "express";
import * as controller from '#controllers/subStatusController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";
import checkEntity from "#middleware/checkEntity.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_sub_statuses' }, checkAbility), controller.get);
router.get("/:status_id", withExtraData({ ability_name: 'get_sub_statuses' }, checkAbility), controller.find);
router.get("/operator/data", withExtraData({ entity: 'operator' }, checkEntity), controller.operator);
router.post("", withExtraData({ ability_name: 'create_sub_statuses' }, checkAbility), controller.create);
router.patch("/:sub_status_id", withExtraData({ ability_name: 'update_sub_statuses' }, checkAbility), controller.update);
router.delete("/:sub_status_id", withExtraData({ ability_name: 'delete_sub_statuses' }, checkAbility), controller.softDelete);

export default router;
