import express from "express";
import * as controller from '#controllers/webmasterController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_webmasters' }, checkAbility), controller.get);
router.get("/free", withExtraData({ ability_name: 'get_free_webmasters' }, checkAbility), controller.getFree);
router.post("", withExtraData({ ability_name: 'create_webmasters' }, checkAbility), controller.create);
router.patch("/:webmaster_id", withExtraData({ ability_name: 'update_webmasters' }, checkAbility), controller.update);
router.delete("/:webmaster_id", withExtraData({ ability_name: 'delete_webmasters' }, checkAbility), controller.softDelete);

export default router;
