import { Router } from 'express';
import express from "express";
import authRoutes from './authRoute.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/uploads', express.static('uploads'));

export default router;