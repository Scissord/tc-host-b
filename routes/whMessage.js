import express from "express";
import * as controller from '#controllers/whMessageController.js';


const router = express.Router();

router.post("/receive", controller.messageReceive);

export default router;
