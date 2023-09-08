const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({ message: 'Authentication failed! No token provided.' });
        }
        
        const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
        
        if (!token) {
            return res.status(403).json({ message: 'Authentication failed! No token provided.' });
        }
        
        const decodedToken = jwt.verify(token, 'secretKey');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Authentication failed!', error: error.message });
    }
};