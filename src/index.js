import express from "express";
import "dotenv/config";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import accidentRoutes from "./features/accidents/accident.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

const app = express();

// Security middleware
app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean),
  }),
);

app.use(express.json());

// Rate limiting
const accidentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
  },
});

// Health endpoints
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API Online!",
  });
});

app.get("/api/health", (req, res) => {
  return res.status(200).json({
    status: "ok",
  });
});

// API routes
app.use("/api/accidents", accidentLimiter, accidentRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
