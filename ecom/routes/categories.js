const express = require("express");
const db = require("../connection");

const router = express.Router();

//  GET all categories
router.get("/", (req, resp) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      resp.status(500).json({ err });
    } else {
      resp.status(200).json({ categories: result });
    }
  });
});

//GET a category by ID
router.get("/:id", (req, resp) => {
  let catId = req.params.id;
  db.query(
    "SELECT * FROM categories WHERE id = ?", [catId],  
    (err, res) => {
      if (err) {
        resp.status(500).json({ msg: err });  
      } else if (res.length === 0) {
        resp.status(404).json({ msg: "Category not found" });  
      } else {
        resp.status(200).json({ category: res[0] }); // ✅ Return a single object
      }
    }
  );
});

//  DELETE a category by ID
router.delete("/:id", (req, resp) => {
  let id = req.params.id;
  db.query("DELETE FROM categories WHERE id = ?", [id], (error, result) => {
    if (error) {
      return resp.status(500).json({ msg: `Error in SQL: ${error.message}` });
    } 
    if (result.affectedRows === 0) {
      return resp.status(404).json({ msg: `No record found with id ${id}` });
    }
    return resp.status(200).json({ msg: `Record deleted successfully with id ${id}` });
  });
});

//  POST a new category
router.post("/", (req, resp) => {
  let body = req.body;
  if (!body.name) {
    return resp.status(400).json({ msg: "Category name is required" });
  }
  
  db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [body.name],
    (err, result) => {
      if (err) {
        return resp.status(500).json({ msg: `Error in SQL: ${err.message}` });
      } else {
        return resp.status(201).json({ msg: "Category added successfully!", id: result.insertId });
      }
    }
  );
});

//  UPDATE a category
router.patch("/", (req, resp) => {
  let { id, name } = req.body;
  
  if (!id || !name) {
    return resp.status(400).json({ msg: "Mandatory field is missing!" });
  }
  
  db.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, id],
    (error, result) => {
      if (error) {
        return resp.status(500).json({ msg: `Error in SQL: ${error.message}` });
      }
      if (result.affectedRows === 0) {
        return resp.status(404).json({ msg: `No record found with id ${id}` });
      }
      return resp.status(200).json({ msg: "Record updated successfully!" });
    }
  );
});

// Export Router
module.exports = router;
