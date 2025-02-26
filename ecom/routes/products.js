const express = require("express");
const db = require("../connection");
const router = express.Router();


//get all products 
router.get("/", (req, res) => {
    db.query(
      `SELECT p.*, c.name AS category_name FROM Products p 
       LEFT JOIN categories c ON p.category = c.id`, 
      (err, result) => {
        if (err) {
          res.status(500).json({ msg: "Error fetching products", err });
        } else {
          res.status(200).json({ products: result });
        }
      }
    );
});

//get products by id
router.get("/:id", (req, res) => {
    let productId = req.params.id;
    db.query(
      `SELECT p.*, c.name AS category_name FROM Products p 
       LEFT JOIN categories c ON p.category = c.id 
       WHERE p.id = ?`,
      [productId],
      (err, result) => {
        if (err) {
          res.status(500).json({ msg: "Error fetching product", err });
        } else if (result.length === 0) {
          res.status(404).json({ msg: "Product not found" });
        } else {
          res.status(200).json({ product: result[0] });
        }
      }
    );
});

//post product
router.post("/", (req, res) => {
    let { name, description, price, stock, category, image } = req.body;
  
    if (!name || !price || stock == null || !category) {
      return res.status(400).json({ msg: "Mandatory fields are missing" });
    }
  
    db.query(
      "INSERT INTO Products (name, description, price, stock, category, image) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, category, image || null],
      (err, result) => {
        if (err) {
          res.status(500).json({ msg: "Error adding product", err });
        } else {
          res.status(201).json({ msg: "Product added successfully", id: result.insertId });
        }
      }
    );
});

//filtered by categories
router.get("/category/:categoryId", (req, res) => {
    let categoryId = req.params.categoryId;
    db.query(
      `SELECT p.*, c.name AS category_name FROM Products p 
       LEFT JOIN categories c ON p.category = c.id 
       WHERE p.category = ?`,
      [categoryId],
      (err, result) => {
        if (err) {
          res.status(500).json({ msg: "Error fetching products by category", err });
        } else {
          res.status(200).json({ products: result });
        }
      }
    );
});

//update the product
router.patch("/:id", (req, res) => {
    let { name, description, price, stock, category, image } = req.body;
    let productId = req.params.id;
  
    db.query(
      "UPDATE Products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image = ? WHERE id = ?",
      [name, description, price, stock, category, image, productId],
      (err, result) => {
        if (err) {
          res.status(500).json({ msg: "Error updating product", err });
        } else if (result.affectedRows === 0) {
          res.status(404).json({ msg: "No product found with this ID" });
        } else {
          res.status(200).json({ msg: "Product updated successfully" });
        }
      }
    );
});

//delete the product
router.delete("/:id", (req, res) => {
    let productId = req.params.id;
  
    db.query("DELETE FROM Products WHERE id = ?", [productId], (err, result) => {
      if (err) {
        res.status(500).json({ msg: "Error deleting product", err });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ msg: "No product found with this ID" });
      } else {
        res.status(200).json({ msg: "Product deleted successfully" });
      }
    });
});
module.exports = router;