import express from "express";
import * as controller from '#controllers/productController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", controller.get);
router.post("", withExtraData({ ability_name: 'create_products' }, checkAbility), controller.create);
router.patch("/:product_id", withExtraData({ ability_name: 'update_products' }, checkAbility), controller.update);
router.delete("/:product_id", withExtraData({ ability_name: 'delete_products' }, checkAbility), controller.softDelete);

export default router;
