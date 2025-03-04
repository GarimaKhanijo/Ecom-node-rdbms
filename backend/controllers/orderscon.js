// Get All Orders for a User → GET /orders/:user_id
// ✔ Get Order Details → GET /orders/:id
// ✔ Create Order → POST /orders
// ✔ Update Order Status → PUT /orders/:id
// ✔ Delete Order → DELETE /orders/:id

const db = require("../config/connection");

exports.getAllOrders = (req,res)=>{
    let orderId = req.params.id;
    db.query(`SELECT * FROM orders `,(err, result) => {
        err ? res.status(500).json({ msg: "Error fetching orders", err }) : res.status(200).json({ orders: result });
    });
};


exports.getOrdersbyId = (req, res) => {
    let orderId = req.params.id;
    db.query(`SELECT * FROM orders WHERE id = ?`, [orderId], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Error fetching orders", err });
        }
        if (result.length === 0) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.status(200).json({ orders: result });
    });
};

exports.createOrder = (req, res) => {
    let { user_id, total_price, status } = req.body;
    if (!user_id || !total_price || !status) {
        return res.status(400).json({ msg: "Missing fields" });
    }

    db.query(
        "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)",
        [user_id, total_price, status],
        (err, result) => {
            if (err) return res.status(500).json({ msg: "Error adding order", err });
            res.status(201).json({ msg: "Order added", id: result.insertId });
        }
    );
};


exports.updateOrder = (req,res)=>{
    let {  total_price, status } = req.body;
    let orderId = req.params.id;
    db.query("UPDATE orders SET  total_price = ?, status = ? WHERE id = ?", [total_price,status,orderId], (err, result) => {
        if (err) return res.status(500).json({ msg: "Error updating product", err });
        if (result.affectedRows === 0) return res.status(404).json({ msg: "No product found" });
        res.status(200).json({ msg: "Product updated" });
      });
}

exports.deleteOrder = (req,res)=>{
    let orderId = req.params.id;
    db.query("DELETE FROM orders WHERE id =?", [orderId], (err, result) => {
        if (err) return res.status(500).json({ msg: "Error deleting product", err });
        if (result.affectedRows === 0) return res.status(404).json({ msg: "No product found" });
        res.status(200).json({ msg: "Product deleted" });
      });
}