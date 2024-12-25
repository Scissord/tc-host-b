import express from "express";
import * as controller from '#controllers/userController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_users' }, checkAbility), controller.get);
router.post("", withExtraData({ ability_name: 'create_users' }, checkAbility), controller.create);
router.patch("/:user_id", withExtraData({ ability_name: 'update_users' }, checkAbility), controller.update);
router.delete("/:user_id", withExtraData({ ability_name: 'delete_users' }, checkAbility), controller.softDelete);

export default router;
