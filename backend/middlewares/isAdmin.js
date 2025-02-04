const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const isAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id);
            if (user.role !== 'admin') {
                return res.status(403).send('Permission denied. Admin access required.');
            }
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }

    if (!token) return res.status(401).json({ message: "Access denied" });
}

module.exports = isAdmin;