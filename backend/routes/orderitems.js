const express = require("express");
const {getAllOrderItems} = require("../controllers/orderitemscon");
const {addOrderItem} = require("../controllers/orderitemscon");
const router = express.Router();

router.get("/:id", getAllOrderItems);
router.post("/", addOrderItem);

module.exports = router;