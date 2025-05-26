const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", reviewRoutes);

app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book Review API!');
});

module.exports = app;

