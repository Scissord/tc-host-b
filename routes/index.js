import { Router } from 'express';
import express from "express";
import authRoutes from './authRoute.js';
import orderRoutes from './orderRoute.js';
import orderSubStatusRoutes from './orderSubStatus.js';
import orderColumnRoutes from './orderColumnRoute.js';
import departmentRoutes from './departmentRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/orders', orderRoutes);
router.use('/order_sub_statuses', orderSubStatusRoutes);
router.use('/order_columns', orderColumnRoutes);
router.use('/departments', departmentRoutes);
router.use('/uploads', express.static('uploads'));

export default router;