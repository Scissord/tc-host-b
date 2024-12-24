import { Router } from 'express';
import verify from '#root/middleware/verify.js';
import express from "express";
import authRoutes from './authRoute.js';
import abilityRoutes from './abilityRoute.js';
import orderRoutes from './orderRoute.js';
import subStatusRoutes from './subStatusRoute.js';
import orderColumnRoutes from './orderColumnRoute.js';
import productRoutes from './productRoute.js';
import departmentRoutes from './departmentRoute.js';
import teamsRoutes from './teamRoute.js';
import cityRoute from './cityRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/abilities', verify, abilityRoutes);
router.use('/orders', verify, orderRoutes);
router.use('/sub_statuses', verify, subStatusRoutes);
router.use('/order_columns', verify, orderColumnRoutes);
router.use('/products', verify, productRoutes);
router.use('/cities', verify, cityRoute);
router.use('/departments', verify, departmentRoutes);
router.use('./teams', verify, teamsRoutes);
router.use('/uploads', verify, express.static('uploads'));

export default router;