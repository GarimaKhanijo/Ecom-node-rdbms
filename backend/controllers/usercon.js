require("dotenv").config();
const db = require("../config/connection");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { otpStore } = require("../controllers/otpcon");


exports.registerUser = async (req, res) => {
  let { name, email, password, phone_no, address } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: "Missing fields" });

  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
      "INSERT INTO users (name, email, password, phone_no, address, role) VALUES (?, ?, ?, ?, ?, 'customer')",
      [name, email, hashedPassword, phone_no || null, address || null],
      (err, result) => {
          if (err) {
              if (err.code === "ER_DUP_ENTRY") {
                  return res.status(400).json({ msg: "Email already exists" });
              }
              return res.status(500).json({ msg: "Error registering user", err });
          }

          const user_id = result.insertId;
          const token = jwt.sign(
              { id: user_id, name, phone_no, role: "customer" },
              process.env.SECRET_KEY,
              { expiresIn: "7d" }
          );

          res.status(201).json({ msg: "User registered", token });
      }
  );
};

  
  exports.loginUser = (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "Missing fields" });
  
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
      if (!users.length) return res.status(401).json({ msg: "Invalid email or password" });
  
      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).json({ msg: "Invalid email or password" });
  
      
      const token = jwt.sign(
        { id: user.id, name: user.name, phone_no: user.phone_no, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
  
      res.json({ msg: "Login successful", token });
    });
  };
  

  exports.getUserDetails = (req, res) => {
    db.query(
      "SELECT id, name, email, phone_no, address, role FROM users WHERE id = ?",
      [req.user.id], // Use `req.user.id` instead of `req.user_id`
      (err, users) => {
        if (err) return res.status(500).json({ msg: "Database error", err });
  
        users.length
          ? res.json(users[0])
          : res.status(404).json({ msg: "User not found" });
      }
    );
  };
  
  
  exports.updateUser = (req, res) => {
    let { name, phone_no, address } = req.body;
    db.query(
      "UPDATE users SET name = ?, phone_no = ?, address = ? WHERE id = ?",
      [name, phone_no, address, req.user.id],
      (err, result) => {
        err ? res.status(500).json({ msg: "Error updating user", err }) : res.json({ msg: "User updated" });
      }
    );
  };


  exports.forgotPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ msg: "Missing fields" });
    }
  
    console.log("Received Email:", email);
    console.log("Stored OTPs:", otpStore);
    
    if (!otpStore[email]) {
      return res.status(400).json({ msg: "OTP expired or not requested" });
    }
    
    if (otpStore[email].toString() !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (err, result) => {
        if (err) {
          return res.status(500).json({ msg: "Error updating password", err });
        }
  
        delete otpStore[email];
        res.json({ msg: "Password updated successfully" });
      }
    );
  };
  
  exports.deleteUser = (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.user.id], (err, result) => {
      err ? res.status(500).json({ msg: "Error deleting user", err }) : res.json({ msg: "User deleted" });
    });
  };
  