const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use((req, res, next) => {
  next();
});
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `method ${req.method} in ${req.url} wasn't found` });
});

app.use((err, req, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
