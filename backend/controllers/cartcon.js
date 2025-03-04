const db = require("../config/connection");

exports.getCartItems = (req, res) => {
  db.query("SELECT * FROM cart WHERE user_id = ?", [req.user_id], (err, items) => {
    err ? res.status(500).json({ msg: "Error fetching cart", err }) : res.json(items);
  });
};

exports.addToCart = (req, res) => {
    const { product_id, quantity } = req.body;
  
    if (!req.user || !req.user.id) {
      return res.status(400).json({ msg: "User ID is missing from token" });
    }
  
    db.query(
      "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
      [req.user.id, product_id, quantity], // Use req.user.id
      (err, result) => {
        err ? res.status(500).json({ msg: "Error adding to cart", err }) : res.json({ msg: "Item added to cart" });
      }
    );
  };
  
  
  exports.updateCartItem = (req, res) => {
    const { quantity } = req.body;
    const { product_id } = req.params; // Get product_id from URL parameters
  
    console.log('User ID:', req.user.id);  // Log user ID
    console.log('Product ID:', product_id);  // Log product ID
    console.log('Quantity:', quantity);  // Log quantity to ensure it's passed correctly
  
    db.query(
      "UPDATE cart SET quantity = ? WHERE product_id = ? AND user_id = ?", 
      [quantity, product_id, req.user.id], // Update based on product_id and user_id
      (err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Error updating cart", err });
        }
        console.log('Query result:', result);  // Log result to see the outcome of the query
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ msg: "Product not found in cart for this user" });
        }
        return res.json({ msg: "Cart item updated" });
      }
    );
  };
  
  
  exports.removeCartItem = (req, res) => {
    const { product_id } = req.params; // Get product_id from the URL parameters
    
    db.query(
      "DELETE FROM cart WHERE product_id = ? AND user_id = ?", 
      [product_id, req.user.id], // Use product_id and user_id to delete the cart item
      (err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Error removing item", err });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ msg: "Product not found in cart for this user" });
        }
  
        return res.json({ msg: "Cart item removed" });
      }
    );
  };
  

  exports.clearCart = (req, res) => {
    // Ensure you're using req.user.id, not req.user_id
    db.query(
      "DELETE FROM cart WHERE user_id = ?", 
      [req.user.id], // Use req.user.id to reference the user's ID
      (err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Error clearing cart", err });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ msg: "No items found in the cart" });
        }
  
        return res.json({ msg: "Cart cleared" });
      }
    );
  };
  