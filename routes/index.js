import { Router } from 'express';
import protectRoute from '#middleware/protectRoute.js';
import express from "express";
import authRoutes from './authRoute.js';
import abilityRoutes from './abilityRoute.js';
import orderRoutes from './orderRoute.js';
import subStatusRoutes from './subStatusRoute.js';
import orderColumnRoutes from './orderColumnRoute.js';
import productRoutes from './productRoute.js';
import departmentRoutes from './departmentRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/abilities', protectRoute, abilityRoutes);
router.use('/orders', protectRoute, orderRoutes);
router.use('/sub_statuses', protectRoute, subStatusRoutes);
router.use('/order_columns', protectRoute, orderColumnRoutes);
router.use('/products', protectRoute, productRoutes);
router.use('/departments', protectRoute, departmentRoutes);
router.use('/uploads', protectRoute, express.static('uploads'));

export default router;