const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/productscon");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
