import { Router } from 'express';
import verify from '#root/middleware/verify.js';
import express from "express";
import authRoutes from './authRoute.js';
import abilityRoutes from './abilityRoute.js';
import orderRoutes from './orderRoute.js';
import statusRoutes from './statusRoute.js';
import subStatusRoutes from './subStatusRoute.js';
import orderColumnRoutes from './orderColumnRoute.js';
import productRoutes from './productRoute.js';
import departmentRoutes from './departmentRoute.js';
import teamsRoutes from './teamRoute.js';
import operatorRoutes from './operatorRoute.js';
import roleRoutes from './roleRoute.js'
import permissionRoutes from './permissionRoute.js'
import cityRoute from './cityRoute.js';
import userRoute from './userRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', verify, userRoute);
router.use('/abilities', verify, abilityRoutes);
router.use('/orders', verify, orderRoutes);
router.use('/statuses', verify, statusRoutes);
router.use('/sub_statuses', verify, subStatusRoutes);
router.use('/order_columns', verify, orderColumnRoutes);
router.use('/products', verify, productRoutes);
router.use('/cities', verify, cityRoute);
router.use('/departments', verify, departmentRoutes);
router.use('/teams', verify, teamsRoutes);
router.use('/operators', verify, operatorRoutes);
router.use('/roles', verify, roleRoutes);
router.use('/permissions', verify, permissionRoutes);
router.use('/uploads', verify, express.static('uploads'));

export default router;