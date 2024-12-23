import express from "express";
import * as controller from '#controllers/cityController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_cities' }, checkAbility), controller.get);
router.post("", withExtraData({ ability_name: 'create_city' }, checkAbility), controller.create);
router.patch("/:city_id", withExtraData({ ability_name: 'update_city' }, checkAbility), controller.update);
router.delete("/:city_id", withExtraData({ ability_name: 'delete_city' }, checkAbility), controller.softDelete);

export default router;
