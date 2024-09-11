const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get the logged-in user's profile
// @access  Private (Requires Authentication)
router.get('/profile', authMiddleware, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update the logged-in user's profile
// @access  Private (Requires Authentication)
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
