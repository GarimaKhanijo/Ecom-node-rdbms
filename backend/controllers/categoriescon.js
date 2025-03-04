const db = require("../config/connection");

exports.getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    err ? res.status(500).json({ err }) : res.status(200).json({ categories: result });
  });
};

exports.getCategoryById = (req, res) => {
  let catId = req.params.id;
  db.query("SELECT * FROM categories WHERE id = ?", [catId], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result.length === 0) return res.status(404).json({ msg: "Category not found" });
    res.status(200).json({ category: result[0] });
  });
};

exports.createCategory = (req, res) => {
  let { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Category name is required" });
  db.query("INSERT INTO categories (name) VALUES (?)", [name], (err, result) => {
    err ? res.status(500).json({ msg: err.message }) : res.status(201).json({ msg: "Category added", id: result.insertId });
  });
};

exports.updateCategory = (req, res) => {
  let { id, name } = req.body;
  if (!id || !name) return res.status(400).json({ msg: "Missing fields" });
  db.query("UPDATE categories SET name = ? WHERE id = ?", [name, id], (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ msg: "No record found" });
    res.status(200).json({ msg: "Category updated" });
  });
};

exports.deleteCategory = (req, res) => {
  let id = req.params.id;
  db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ msg: "No record found" });
    res.status(200).json({ msg: "Category deleted" });
  });
};
