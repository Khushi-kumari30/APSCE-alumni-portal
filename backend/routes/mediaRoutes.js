const express = require("express");
const multer = require("multer");
const db = require("../config/db"); // Use your MySQL pool

const router = express.Router();

// 1. Configure Storage
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
const upload = multer({ storage });

// 2. Upload Media (INSERT into MySQL)
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const { type, year } = req.body;
        const fileUrl = `/uploads/${req.file.filename}`;

        const [result] = await db.execute(
            "INSERT INTO media (type, year, fileUrl) VALUES (?, ?, ?)",
            [type, year, fileUrl]
        );

        res.json({ 
            message: "Media Uploaded to MySQL", 
            mediaId: result.insertId,
            fileUrl 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error during upload" });
    }
});

// 3. Get Media (SELECT from MySQL)
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM media ORDER BY year DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error fetching media" });
    }
});

module.exports = router;