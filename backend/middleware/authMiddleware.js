const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Try decoded.id first, then decoded._id
            const userId = decoded.user.id || decoded.user._id;
            if (!userId) {
                console.error('Protect middleware error: No id or _id in JWT payload', decoded);
                return res.status(401).json({ message: 'Not authorized, invalid token payload' });
            }
            req.user = await User.findById(userId).select('-password');
            if (!req.user) {
                console.error(`Protect middleware error: User not found for ID ${userId}`);
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            next();
        } catch (error) {
            console.error('Protect middleware error:', error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired, please log in again' });
            }
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.error('Protect middleware error: No token provided');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Admin access required' });
    }
};

module.exports = { protect, isAdmin };