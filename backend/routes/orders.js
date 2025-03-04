const express = require("express");
const { getAllOrders, createOrder, updateOrder } = require("../controllers/orderscon");
const { getProductById } = require("../controllers/productscon");
const { getOrdersbyId } = require("../controllers/orderscon");
const {deleteOrder} = require("../controllers/orderscon");
const router = express.Router();


router.get("/", getAllOrders);
router.get("/:id",getOrdersbyId);
router.post("/",createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);
module.exports = router; 