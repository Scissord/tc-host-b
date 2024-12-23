import express from "express";
import * as controller from '#controllers/abilityController.js';

const router = express.Router();

router.get("/header", controller.getForHeader);

export default router;
