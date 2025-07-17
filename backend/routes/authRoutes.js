const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    console.log("Incoming register request");
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ username, password });
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      console.error("Register Error:", error.message);
      res.status(500).json({ error: "Something went wrong." });
    }
})

module.exports = router;