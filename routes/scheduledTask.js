import express from "express";
import * as controller from '#controllers/scheduledTasksController.js';

const router = express.Router();

router.get("", controller.get);
router.patch("/update", controller.update)
export default router;
