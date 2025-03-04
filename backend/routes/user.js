const express = require("express");
const { registerUser, loginUser, getUserDetails, updateUser, deleteUser ,forgotPassword} = require("../controllers/usercon");
const isAuthenticated = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.get("/profile", isAuthenticated, getUserDetails);


router.put("/profile", isAuthenticated, updateUser);

router.delete("/profile", isAuthenticated, deleteUser);
router.post("/forgot-password", forgotPassword);



module.exports = router;
