// import setupCluster from '#services/cluster/cluster.js';
import { app, server } from '#services/socket/socket.js';
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from '#routes/index.js';

dotenv.config();

const allowedOrigins = [
  'http://localhost:5173',
  'https://talkcall-crm.com',
  "https://www.talkcall-crm.com",
];

const PORT = process.env.PORT || 8080;

// Логика приложения
function startServer() {
  app.use(express.json());
  app.use(cookieParser());

  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  }));

  app.use('/api', apiRoutes);

  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT} ✅✅✅`);
  });
}

startServer();

// Инициализация кластера
// setupCluster(startServer);
