import express from "express";
import * as controller from '#controllers/teamController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", controller.get);
router.get("/:team_id", controller.find);
router.get("/department/:department_id", controller.getByDepartment);
router.post("", withExtraData({ ability_name: 'create_teams' }, checkAbility), controller.create);
router.patch("/operator/:user_id", withExtraData({ ability_name: 'update_teams' }, checkAbility), controller.addOperator);
router.patch("/:team_id", withExtraData({ ability_name: 'update_teams' }, checkAbility), controller.update);
router.delete("/:team_id", withExtraData({ ability_name: 'delete_teams' }, checkAbility), controller.softDelete);

export default router;
