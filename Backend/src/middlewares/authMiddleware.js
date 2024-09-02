const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret } = require('../config/environment');

exports.authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    const user = await User.findById(decoded.userId);
    if (!user || !user.isApproved) {
      return res.status(401).json({ message: 'Authorization denied' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};