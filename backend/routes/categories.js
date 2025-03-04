<<<<<<< HEAD
const express = require("express");
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controllers/categoriescon");
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.patch("/", updateCategory);
router.delete("/:id", deleteCategory);

=======
const express = require("express");
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controllers/categoriescon");
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.patch("/", updateCategory);
router.delete("/:id", deleteCategory);

>>>>>>> 8d0c3eed3ec16e2fa3b03e78db03ba4456ad4f24
module.exports = router;