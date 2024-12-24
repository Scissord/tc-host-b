import express from "express";
import * as controller from '#controllers/roleController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_roles' }, checkAbility), controller.getRoles);
router.post("", withExtraData({ ability_name: 'create_role' }, checkAbility), controller.create);
router.patch("/:role_id", withExtraData({ ability_name: 'update_role' }, checkAbility), controller.update);
router.delete("/:role_id", withExtraData({ ability_name: 'delete_role' }, checkAbility), controller.destroy);

export default router;
