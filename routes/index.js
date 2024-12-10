import { Router } from 'express';
import express from "express";
import authRoutes from './authRoute.js';
import productRoutes from './productRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/uploads', express.static('uploads'));

export default router;