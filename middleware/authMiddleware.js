// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../model/blacklistToken');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await BlacklistedToken.exists({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token has been blacklisted' });
    }

    const decoded = jwt.verify(token, 'Devnandan');
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
