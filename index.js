const express = require("express");
require("dotenv").config;

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "API Online!" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
