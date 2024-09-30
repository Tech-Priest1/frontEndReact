const jwt = require('jsonwebtoken');
const Admin = require('../models/admins');
const Member = require('../models/members'); 

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ error: 'Token não fornecido.' });
    }

    try {
     
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; 
        
        
        const admin = await Admin.findById(req.userId);
        if (admin) {
            req.isAdmin = true; 
            next();
        } else {
           
            const member = await Member.findById(req.userId);
            if (member) {
                req.isAdmin = false; 
                next(); 
            } else {
                return res.status(403).json({ error: 'Acesso negado.' }); 
            }
        }
    } catch (error) {
        console.error("Error verificando token:", error);
        return res.status(401).json({ error: 'Token inválido.' });
    }
};

module.exports = authenticate;
