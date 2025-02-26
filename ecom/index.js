require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./connection");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("<h1>Hello, E-Commerce API is Running!</h1>");
});

// Use category routes
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
