import express from "express";
import * as controller from '#controllers/permissionController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("/:entity_id/:entity_type", withExtraData({ ability_name: 'get_permissions' }, checkAbility), controller.getByEntity);
router.patch("", withExtraData({ ability_name: 'create_permissions' }, checkAbility), controller.toggle);
router.post("/change_order_visibility", withExtraData({ ability_name: 'change_order_visibility' }, checkAbility), controller.changeOrderPermissions);

export default router;
