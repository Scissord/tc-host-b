import express from "express";
import * as controller from '#controllers/assignedRoleController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("/:role_id", withExtraData({ ability_name: 'get_assigned_role' }, checkAbility), controller.getByRole);
router.post("", withExtraData({ ability_name: 'create_assigned_role' }, checkAbility), controller.create);
router.delete("/:assigned_role_id", withExtraData({ ability_name: 'delete_assigned_role' }, checkAbility), controller.hardDelete);

export default router;
