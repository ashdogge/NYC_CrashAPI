import app from "./index.js";
import "dotenv/config";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
app.get("/", (req, res) => {
  return res.status(200).json({ message: "API Online!" });
});
