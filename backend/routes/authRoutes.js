
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require('../db'); 

const router = express.Router();

router.post("/login", async (req, res) => {
    // 1. Log the data to see what the frontend is actually sending
    console.log("Login attempt for:", req.body.email);

    const { email, password } = req.body;

    // 2. SAFETY CHECK: Prevent the "undefined" crash
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }

    try {
        // 3. Check if user exists
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 5. Sign JWT
        // Ensure JWT_SECRET is defined in your .env
        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET || 'your_fallback_secret', 
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (err) {
        console.error("Database Error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;