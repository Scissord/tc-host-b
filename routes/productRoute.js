import express from "express";
import * as controller from '#controllers/productController.js';

const router = express.Router();

router.get("", controller.get);
// fetch products from dummy json, should use postman
router.post("/fetch", controller.fetchProducts);

export default router;
