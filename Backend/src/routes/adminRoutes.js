const express = require('express');
const { approveUser, createProduct, getOrders } = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/approve-user/:userId', authMiddleware, adminMiddleware, approveUser);
router.post('/product', authMiddleware, adminMiddleware, createProduct);
router.get('/orders', authMiddleware, adminMiddleware, getOrders);

module.exports = router;