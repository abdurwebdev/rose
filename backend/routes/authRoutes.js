const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log("Incoming register request");
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Incoming login request");
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
})

module.exports = router;