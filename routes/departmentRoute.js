import express from "express";
import * as controller from '#controllers/departmentController.js';

const router = express.Router();

router.get("", controller.getDepartments);
router.get("/head_ability/:department_id", controller.getDepartmentHeadAbility);

export default router;
