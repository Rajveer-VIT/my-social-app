const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const { ensureAuthenticated } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Signup successful, please login" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logout successful" });
  });
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;