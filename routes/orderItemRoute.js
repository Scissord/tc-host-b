import express from "express";
import * as controller from '#controllers/orderItemController.js';

const router = express.Router();

router.post("", controller.create);
router.delete("/:order_item_id", controller.hardDelete);

export default router;
