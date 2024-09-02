const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./environment');

const generateToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

module.exports = { generateToken };