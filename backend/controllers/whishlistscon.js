// Wishlist Table (wishlist)
// Operations Needed:
// ✔ Get Wishlist for a User → GET /wishlist/:user_id
// ✔ Add Item to Wishlist → POST /wishlist
// ✔ Remove Item from Wishlist → DELETE /wishlist/:id


const db = require("../config/connection");

exports.getWishlist = (req, res) => {
    let userId = req.params.id;
    db.query(`SELECT * FROM wishlist WHERE user_id = ?`,[userId],(err, result) => {
        err? res.status(500).json({msg:"Error fetching wishlist",err}):res.status(200).json({wishlist:result});
    });
};

exports.addItemToWishlist = (req, res) => {
    let { user_id, product_id } = req.body;
    if (!user_id || !product_id) {
        return res.status(400).json({ msg: "Missing fields" });
    }
    db.query(`INSERT INTO whislist (user_id, product_id) VALUES (?,?)`, [user_id, product_id], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Error adding item to wishlist", err });
        }
        res.status(201).json({ msg: "Item added to wishlist", id: result.insertId });
    });
};


exports.removeItemFromWishlist = (req, res) => {
    let wishlistId = req.params.id;
    db.query(`DELETE FROM whislist WHERE id = ?`, [wishlistId], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Error removing item from wishlist", err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "No item found in wishlist" });
        }
        res.status(200).json({ msg: "Item removed from wishlist" });
    });
};