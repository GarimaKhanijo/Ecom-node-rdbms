const db = require("../config/connection");

exports.getAllProducts = (req, res) => {
  db.query(`SELECT p.*, c.name AS category_name FROM Products p LEFT JOIN categories c ON p.category = c.id`, (err, result) => {
    err ? res.status(500).json({ msg: "Error fetching products", err }) : res.status(200).json({ products: result });
  });
};
// GET /products/:id
exports.getProductById = (req, res) => {
  let productId = req.params.id;
  db.query(
    `SELECT p.*, c.name AS category_name FROM Products p LEFT JOIN categories c ON p.category = c.id WHERE p.id = ?`,
    [productId],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Error fetching product", err });
      if (result.length === 0) return res.status(404).json({ msg: "Product not found" });
      res.status(200).json({ product: result[0] });
    }
  );
};


// exports.getProductById = (req, res) => {
//   let productId = req.params.id;
//   db.query(`SELECT p.*, c.name AS category_name FROM Products p LEFT JOIN categories c ON p.category = c.id WHERE p.id = ?`, [productId], (err, result) => {
//     if (err) return res.status(500).json({ msg: "Error fetching product", err });
//     if (result.length === 0) return res.status(404).json({ msg: "Product not found" });
//     res.status(200).json({ product: result[0] });
//   });
// };

exports.createProduct = (req, res) => {
  const { name, description, price, stock, category, image } = req.body;
  const userEmail = req.user.email;  // Make sure user is authenticated and email is available

  // Ensure all required fields are provided
  if (!name || !price || stock == null || !category) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  // Insert product into database and link it with the user's email
  db.query(
    `INSERT INTO Products (name, description, price, stock, category, image, email) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, description, price, stock, category, image || null, userEmail],
    (err, result) => {
      if (err) {
        console.error('Error adding product:', err);  // Log the error for debugging
        return res.status(500).json({ msg: "Error adding product", err });
      }
      res.status(201).json({ msg: "Product added", id: result.insertId });
    }
  );
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


exports.getUsersWhoOrderedProduct = (req, res) => {
  const productId = req.params.id;
  db.query(
    `SELECT u.id, u.name, u.email FROM users u 
     JOIN orders o ON o.user_id = u.id 
     JOIN order_items oi ON oi.order_id = o.id 
     WHERE oi.product_id = ?`,
    [productId],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Error fetching users", err });
      if (result.length === 0) return res.status(404).json({ msg: "No users found for this product" });
      res.status(200).json({ users: result });
    }
  );
};

// productscon.js
exports.getProductsByUser = (req, res) => {
  const userEmail = req.user.email; // Get the logged-in user's email from the authentication middleware

  // Query to get products where the email matches the logged-in user's email
  db.query(
    `SELECT p.*, c.name AS category_name FROM Products p 
     LEFT JOIN categories c ON p.category = c.id 
     WHERE p.email = ?`,
    [userEmail],
    (err, result) => {
      if (err) return res.status(500).json({ msg: "Error fetching your products", err });
      res.status(200).json({ products: result });
    }
  );
};

exports.getProductsByCategory = (req, res) => {
  const categoryId = req.query.category;  // Get the category ID from query parameters

  if (!categoryId) {
    // If no category ID is provided, return all products
    return res.status(400).json({ message: 'Category ID is required' });
  }

  const query = `
    SELECT * FROM products WHERE category_id = ?;
  `;

  db.query(query, [categoryId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching products' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    res.status(200).json({ products: result });  // Return filtered products
  });
};