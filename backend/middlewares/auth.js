// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const isAuthenticated = (req, res, next) => {
//     const authHeader = req.header("Authorization");
  
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ msg: "Access denied. No token provided." });
//     }
  
//     const token = authHeader.split(" ")[1]; 
  
//     try {
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);
//       req.user = decoded;
//       next();
//     } catch (err) {
//       res.status(400).json({ msg: "Invalid token" });
//     }
//   };
//   exports.isAdmin = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ msg: "Access denied. Admins only." });
//     }
//     next();
//   };
// module.exports = isAuthenticated;

const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Contains id, name, role, etc.
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: "Access denied. Admins only." });
  }
  next();
};

module.exports = {
  isAuthenticated,
  isAdmin
};
