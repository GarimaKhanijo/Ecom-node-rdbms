// Payment Table (payment)
// Operations Needed:
// ✔ Get Payment Details → GET /payment/:order_id
// ✔ Create Payment → POST /payment
// ✔ Update Payment Status → PUT /payment/:id

const db = require("../config/connection"); 

exports.getPaymentDetails = (req,res)=>{
    let orderId = req.params.order_id;
    db.query(`SELECT * FROM payment WHERE order_id = ?`,[orderId],(err, result) => {
        err ? res.status(500).json({ msg: "Error fetching payment", err }) : res.status(200).json({ payment: result });
    });
};

exports.createPayment = (req, res) => {
    let { order_id, method, status, amount } = req.body;
    if (!order_id || !method || !status || !amount) {
        return res.status(400).json({ msg: "Missing fields" });
    }
    db.query(`INSERT INTO payment (order_id, method, status, amount) VALUES (?,?,?,?)`, [order_id, method, status, amount], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Error creating payment", err });
        }
        res.status(201).json({ msg: "Payment created successfully", id: result.insertId });
    });
};


exports.updatePaymentStatus = (req,res)=>{
    let paymentId = req.params.id;
    let { status,amount } = req.body;
    if (!status || !amount) {
        return res.status(400).json({ msg: "Missing fields" });
    }
    db.query("UPDATE payment SET status = ? ,amount= ? WHERE id = ?", [status,amount,paymentId], (err, result) => {
        if (err) return res.status(500).json({ msg: "Error updating payment", err });
        if (result.affectedRows === 0) return res.status(404).json({ msg: "No payment found" });
        res.status(200).json({ msg: "Payment updated" });
      });

};