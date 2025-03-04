const express = require("express");
require("dotenv").config();
const PORT=8080;
const cors = require("cors");

const userRoutes = require("./routes/user");
const otpRoutes=require("./routes/otp");
const orderRoutes = require("./routes/orders");
const orderItems = require("./routes/orderitems");
const payments = require("./routes/payments");
const locationroute=require("./routes/location");
const wishlistroute=require("./routes/whishlist");
const cartRoutes=require("./routes/cart");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("<h1>E-Commerce API Running</h1>"));
app.use("/users", userRoutes);
app.use("/otp",otpRoutes);
app.use("/orders",orderRoutes);
app.use("/order_items",orderItems);
app.use("/payments",payments);
app.use("/location",locationroute);
app.use("/wishlist",wishlistroute);
app.use("/cart",cartRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
