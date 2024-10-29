const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const { User } = require("../models");
const { generateToken } = require("../utils/jwtUtils");
const router = express.Router();

// Login Route
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array() });

    const { username, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ where: { username } });

      if (!user) return res.status(400).json({ message: "User not found!" });

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

      // Generate JWT token
      const token = generateToken({ id: user.id, username: user.username });

      res
        .status(200)
        .json({ message: "Login Successful", user: user, token: token });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

module.exports = router;
