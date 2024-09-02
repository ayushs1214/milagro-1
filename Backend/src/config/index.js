const connectDB = require('./db');
const { generateToken } = require('./auth');

module.exports = { connectDB, generateToken };