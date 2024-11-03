const jwt = require("jsonwebtoken");
// const secret = process.env.JWT_SECRET;
const secret = "secret";

// Generate JWT token
exports.generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

// Verify JWT token
exports.verifyToken = (token) => {
  return jwt.verifyToken(token, secret);
};
