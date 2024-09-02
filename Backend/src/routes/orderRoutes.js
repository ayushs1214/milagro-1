const express = require('express');
const { placeOrder, getOrderStatus } = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/place', authMiddleware, placeOrder);
router.get('/status/:id', authMiddleware, getOrderStatus);

module.exports = router;