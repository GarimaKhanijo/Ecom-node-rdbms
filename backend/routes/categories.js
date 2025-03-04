const express = require("express");
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controllers/categoriescon");
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.patch("/", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;