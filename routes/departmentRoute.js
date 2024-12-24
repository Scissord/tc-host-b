import express from "express";
import * as controller from '#controllers/departmentController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_departments' }, checkAbility), controller.get);
router.post("", withExtraData({ ability_name: 'create_departments' }, checkAbility), controller.create);
router.patch("/:department_id", withExtraData({ ability_name: 'update_departments' }, checkAbility), controller.update);
router.delete("/:department_id", withExtraData({ ability_name: 'delete_departments' }, checkAbility), controller.softDelete);

export default router;
