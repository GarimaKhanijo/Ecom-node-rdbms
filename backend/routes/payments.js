const express = require("express")

const { getPaymentDetails, createPayment, updatePaymentStatus } = require("../controllers/paymentscon")
const router = express.Router()

router.get("/:order_id", getPaymentDetails)
router.post("/", createPayment)
router.put("/:id", updatePaymentStatus)
module.exports = router;