import express from "express";
import * as controller from '#root/controllers/subStatusController.js';

const router = express.Router();

router.get("", controller.getSubStatuses);

export default router;
