import express from "express";
import * as controller from '#controllers/productController.js';
import withExtraData from "#middleware/withExtraData.js";
import checkAbility from "#middleware/checkAbility.js";

const router = express.Router();

router.get("", withExtraData({ ability_name: 'get_products' }, checkAbility), controller.get);
router.post("", withExtraData({ ability_name: 'create_product' }, checkAbility), controller.create);
router.patch("/:product_id", withExtraData({ ability_name: 'update_product' }, checkAbility), controller.update);
router.delete("/:product_id", withExtraData({ ability_name: 'delete_product' }, checkAbility), controller.softDelete);

export default router;
