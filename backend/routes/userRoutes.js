const express = require('express');
const router = express.Router();
const pool = require('../db');
const { sendOTP, registerUser, loginUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

// --- PUBLIC ROUTES ---
router.post('/send-otp', sendOTP);
router.post('/register', registerUser);
router.post('/login', loginUser);

// --- PROTECTED ROUTES (Requires Login) ---

/**
 * 1. GET PROFILE DATA
 * Used to fetch the user's current info to display in the form fields.
 */
router.get('/profile-data', verifyToken, async (req, res) => {
    try {
        // req.user.id is extracted from the JWT by verifyToken middleware
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Return the full user object
        res.json(rows[0]); 
    } catch (err) {
        console.error("Database fetch error:", err);
        res.status(500).json({ message: "Database error", error: err.message });
    }
});

/**
 * 2. UPDATE PROFILE DATA
 * Handles saving all the fields from your profile form into MySQL.
 */
router.put('/update-profile', verifyToken, async (req, res) => {
    // Destructure ALL fields from the request body
    const { 
        first_name, 
        middle_name, 
        last_name, 
        usn, 
        branch, 
        year_passed, 
        designation, 
        company, 
        location, 
        phone, 
        whatsapp, 
        linkedin 
    } = req.body;

    try {
        // SQL Query updated to include all the new columns
        const sql = `
            UPDATE users 
            SET first_name = ?, 
                middle_name = ?, 
                last_name = ?, 
                usn = ?, 
                branch = ?, 
                year_passed = ?, 
                designation = ?, 
                company = ?, 
                location = ?, 
                phone = ?, 
                whatsapp = ?, 
                linkedin = ?
            WHERE id = ?`;
            
        // Map the values to the question marks in order
        const values = [
            first_name, 
            middle_name, 
            last_name, 
            usn, 
            branch, 
            year_passed, 
            designation, 
            company, 
            location, 
            phone, 
            whatsapp, 
            linkedin, 
            req.user.id // The ID of the logged-in user
        ];

        const [result] = await pool.query(sql, values);

        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Profile updated successfully in the database!" });
        } else {
            res.status(400).json({ success: false, message: "No changes were made or user not found." });
        }
    } catch (err) {
        console.error("Database update error:", err);
        res.status(500).json({ success: false, message: "Update failed", error: err.message });
    }
});

module.exports = router;