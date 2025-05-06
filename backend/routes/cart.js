const express = require("express");
const router = express.Router();
const { getCartItems, addToCart, updateCartItem, removeCartItem, clearCart } = require("../controllers/cartcon");
const {isAuthenticated,isAdmin} = require("../middlewares/auth");

router.get("/", isAuthenticated, getCartItems); // Get cart items for logged-in user
router.post("/", isAuthenticated, addToCart); // Add item to cart
router.put("/:product_id", isAuthenticated, updateCartItem); 
router.delete("/:product_id", isAuthenticated, removeCartItem); // Remove item from cart
router.delete("/", isAuthenticated, clearCart); // Clear cart for logged-in user

module.exports = router;