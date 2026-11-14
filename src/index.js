import express from "express";
import "dotenv/config";
import cors from "cors";

import accidentRoutes from "./features/accidents/accident.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json());
app.use("/api/accidents", accidentRoutes);
app.use(notFound);
app.use(errorHandler);
// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   return res.status(200).json({ message: "API Online!" });
// });

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

export default app;
