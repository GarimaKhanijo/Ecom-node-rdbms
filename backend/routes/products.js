const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getUsersWhoOrderedProduct,
  getProductsByUser,
  getProductsByCategory,
} = require("../controllers/productscon");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/my", isAuthenticated, isAdmin, getProductsByUser);

router.get("/:id", getProductById);

router.post("/", isAuthenticated, isAdmin, createProduct);

router.get("/products/id", (req, res) => {
  let categoryId = req.query.categoryId;

  if (!categoryId || isNaN(categoryId)) {
    return res.status(400).json({ msg: "Invalid or missing categoryId" });
  }

  getProductsByCategory(categoryId, (err, products) => {
    if (err) return res.status(500).json({ msg: "Error fetching products by category", error: err });
    res.status(200).json({ products });
  });
});

router.patch("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/:id/users", getUsersWhoOrderedProduct);

module.exports = router;
