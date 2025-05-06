//  Order Items Table (order_items)
// Operations Needed:
// ✔ Get Items for an Order → GET /order_items/:order_id
// ✔ Add Item to Order → POST /order_items


const db = require("../config/connection"); 

exports.getAllOrderItems = (req,res)=>{
    let orderId = req.params.id;
    db.query(`SELECT * FROM order_items WHERE order_id = ?`,[orderId],(err, result) => {
        err ? res.status(500).json({ msg: "Error fetching order items", err }) : res.status(200).json({ order_items: result });
    });
}


exports.addOrderItem = (req, res) => {
    const { order_id, product_id, quantity, price, name } = req.body;

    // Ensure all fields are provided
    if (!order_id || !product_id || !quantity || !price || !name) {
        return res.status(400).json({ msg: "Missing fields" });
    }

    const query = `INSERT INTO order_items (order_id, product_id, quantity, price, name) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [order_id, product_id, quantity, price, name], (err, result) => {
        if (err) return res.status(500).json({ msg: "Error adding order item", err });
        res.status(201).json({ msg: "Order item added", id: result.insertId });
    });
};