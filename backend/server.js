const express = require("express");
require("dotenv").config();
const PORT=8080;
const cors = require("cors");

const userRoutes = require("./routes/user");
const otpRoutes=require("./routes/otp");
const orderRoutes = require("./routes/orders");
const orderItems = require("./routes/orderitems");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const payments = require("./routes/payments");
const locationroute=require("./routes/location");
const wishlistroute=require("./routes/whishlist");
const cartRoutes=require("./routes/cart");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("<h1>E-Commerce API Running</h1>"));
app.use("/api/users", userRoutes);
app.use("/api/otp",otpRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/order_items",orderItems);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments",payments);
app.use("/api/location",locationroute);
app.use("/wishlist",wishlistroute);
app.use("/api/cart",cartRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));