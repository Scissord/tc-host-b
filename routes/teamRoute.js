import express from "express";
import * as controller from '#controllers/teamController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("/data/:team_id", withExtraData({ ability_name: 'get_teams' }, checkAbility), controller.getByTeam);
router.get("/:department_id", withExtraData({ ability_name: 'get_teams' }, checkAbility), controller.getByDepartment);
router.post("", withExtraData({ ability_name: 'create_teams' }, checkAbility), controller.create);
router.patch("/:team_id", withExtraData({ ability_name: 'update_teams' }, checkAbility), controller.update);
router.delete("/:team_id", withExtraData({ ability_name: 'delete_teams' }, checkAbility), controller.softDelete);

export default router;