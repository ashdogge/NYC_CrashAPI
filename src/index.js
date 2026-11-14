import express from "express";
import "dotenv/config";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json());

// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   return res.status(200).json({ message: "API Online!" });
// });

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

export default app;
