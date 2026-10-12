const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Get token from the Header (Authorization: Bearer <token>)
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "No token provided. Access denied." });
    }

    try {
        // 2. Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Attach user info to the request object for later use
        req.user = decoded; 
        
        // 4. Move to the next function (the actual route logic)
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = verifyToken;