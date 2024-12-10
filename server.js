import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import apiRoutes from '#routes/index.js';

const allowedOrigins = [
  'http://localhost:5173',
  'https://tc-chat.pw',
];

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

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

app.listen(PORT, () => {
	console.log(`Welcome to cv server, port ${PORT} ✅✅✅`);
});
