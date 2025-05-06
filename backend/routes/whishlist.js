const express = require("express");
const { getWishlist, addItemToWishlist, removeItemFromWishlist } = require("../controllers/whishlistscon");
const router = express.Router();


router.get("/:user_id", getWishlist);
router.post("/", addItemToWishlist);    
router.delete("/:id", removeItemFromWishlist);

module.exports = router;