const jwt = require('jsonwebtoken');
const Admin = require('../models/admins'); 

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Bearer format

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }

    try {
        // Verify token and decode
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; // Assuming the token contains the user ID
        
        // Check if admin exists and has the correct role
        const admin = await Admin.findById(req.userId);
        req.isAdmin = admin && admin.role === 'admin'; // Check if the user is an admin
        
        // Log decoded token details
        console.log("Decoded token:", decoded);
        console.log("User ID from token:", req.userId);
        console.log("Is Admin:", req.isAdmin);

        if (!req.isAdmin) {
            return res.status(403).json({ error: 'Acesso negado.' }); // Optional: deny access if not admin
        }

        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({ error: 'Token inválido.' });
    }
};

module.exports = authenticate;
