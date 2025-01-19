import express from "express";
import * as controller from '#controllers/scheduledTasksController.js';

const router = express.Router();

router.get("", controller.get);
router.patch("/update", controller.update) // нужно отправить в формате чч:мм
export default router;
