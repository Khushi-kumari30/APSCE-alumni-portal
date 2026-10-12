const db = require('../db');

const User = {
    findByEmail: async (email) => {
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    },

    // Matches your 'verified' and 'otp' columns
    upsertOtp: async (email, otp) => {
        const query = `
            INSERT INTO users (email, otp, verified) 
            VALUES (?, ?, 0) 
            ON DUPLICATE KEY UPDATE otp = ?, verified = 0
        `;
        return db.execute(query, [email, otp, otp]);
    },

    // Matches your 'verified' and 'password' columns
    register: async (name, email, hashedPassword, role) => {
        const query = `
            UPDATE users 
            SET name = ?, password = ?, role = ?, verified = 1, otp = NULL 
            WHERE email = ?
        `;
        return db.execute(query, [name, hashedPassword, role, email]);
    }
};

module.exports = User;