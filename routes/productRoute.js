import express from "express";
import * as controller from '#controllers/productController.js';

const router = express.Router();

router.get("", controller.get);
router.post("", controller.create);
router.patch("/:product_id", controller.update);
router.delete("/:product_id", controller.softDelete);

export default router;
