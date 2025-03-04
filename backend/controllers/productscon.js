const db = require("../config/connection");

exports.getAllProducts = (req, res) => {
  db.query(`SELECT p.*, c.name AS category_name FROM Products p LEFT JOIN categories c ON p.category = c.id`, (err, result) => {
    err ? res.status(500).json({ msg: "Error fetching products", err }) : res.status(200).json({ products: result });
  });
};

exports.getProductById = (req, res) => {
  let productId = req.params.id;
  db.query(`SELECT p.*, c.name AS category_name FROM Products p LEFT JOIN categories c ON p.category = c.id WHERE p.id = ?`, [productId], (err, result) => {
    if (err) return res.status(500).json({ msg: "Error fetching product", err });
    if (result.length === 0) return res.status(404).json({ msg: "Product not found" });
    res.status(200).json({ product: result[0] });
  });
};

exports.createProduct = (req, res) => {
  let { name, description, price, stock, category, image } = req.body;
  if (!name || !price || stock == null || !category) return res.status(400).json({ msg: "Missing fields" });
  db.query("INSERT INTO Products (name, description, price, stock, category, image) VALUES (?, ?, ?, ?, ?, ?)", [name, description, price, stock, category, image || null], (err, result) => {
    err ? res.status(500).json({ msg: "Error adding product", err }) : res.status(201).json({ msg: "Product added", id: result.insertId });
  });
};

exports.updateProduct = (req, res) => {
  let { name, description, price, stock, category, image } = req.body;
  let productId = req.params.id;
  db.query("UPDATE Products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image = ? WHERE id = ?", [name, description, price, stock, category, image, productId], (err, result) => {
    if (err) return res.status(500).json({ msg: "Error updating product", err });
    if (result.affectedRows === 0) return res.status(404).json({ msg: "No product found" });
    res.status(200).json({ msg: "Product updated" });
  });
};

exports.deleteProduct = (req, res) => {
  let productId = req.params.id;
  db.query("DELETE FROM Products WHERE id = ?", [productId], (err, result) => {
    if (err) return res.status(500).json({ msg: "Error deleting product", err });
    if (result.affectedRows === 0) return res.status(404).json({ msg: "No product found" });
    res.status(200).json({ msg: "Product deleted" });
  });
};