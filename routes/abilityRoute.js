import express from "express";
import * as controller from '#controllers/abilityController.js';
import checkAbility from "#middleware/checkAbility.js";
import withExtraData from "#middleware/withExtraData.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_abilities' }, checkAbility), controller.get);
router.get("/header", controller.getForHeader);
router.post("/get_abilities_by_entity_type", withExtraData({ ability_name: 'get_abilities_by_entity_type' }, checkAbility), controller.getAbilitiesByEntityType);

export default router;
