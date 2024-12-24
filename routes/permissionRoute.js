import express from "express";
import * as controller from '#root/controllers/permissionController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.post("/change_order_visibility", withExtraData({ ability_name: 'change_order_visibility' }, checkAbility), controller.changePermissions);
export default router;
