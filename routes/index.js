import { Router } from 'express';
import protectRoute from '#middleware/protectRoute.js';
import express from "express";
import authRoutes from './authRoute.js';
import abilityRoutes from './abilityRoute.js';
import orderRoutes from './orderRoute.js';
import orderSubStatusRoutes from './orderSubStatus.js';
import orderColumnRoutes from './orderColumnRoute.js';
import productRoutes from './productRoute.js';
import departmentRoutes from './departmentRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/abilities', abilityRoutes);
router.use('/orders', orderRoutes);
router.use('/order_sub_statuses', orderSubStatusRoutes);
router.use('/order_columns', orderColumnRoutes);
router.use('/products', protectRoute, productRoutes);
router.use('/departments', departmentRoutes);
router.use('/uploads', express.static('uploads'));

export default router;