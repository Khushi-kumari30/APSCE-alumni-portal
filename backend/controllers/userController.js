const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. SEND OTP
const sendOTP = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    try {
        await db.execute('INSERT INTO users (email, otp) VALUES (?, ?) ON DUPLICATE KEY UPDATE otp = ?', [email, otp, otp]);
        console.log(`OTP for ${email}: ${otp}`); // For testing
        res.status(200).json({ message: "OTP sent successfully! Check your console/email." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. REGISTER USER
const registerUser = async (req, res) => {
    const { name, email, password, otp, role } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND otp = ?', [email, otp]);
        if (rows.length === 0) return res.status(400).json({ message: "Invalid OTP" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute(
            'UPDATE users SET name = ?, password = ?, role = ?, verified = 1, otp = NULL WHERE email = ?',
            [name, hashedPassword, role, email]
        );
        res.status(200).json({ message: "Registration successful! You can now login. ✅" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ message: "User not found" });

        const user = rows[0];
        if (!user.verified) return res.status(401).json({ message: "Please verify your email first" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Login successful!", token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { sendOTP, registerUser, loginUser };