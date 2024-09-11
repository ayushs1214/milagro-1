const express = require('express');
const {
  approveUser,
  createProduct,
  getOrders,
  updateProduct,
  updateOrderStatus,
  removeUser,
  removeSalesperson,
} = require('../controllers/adminController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Approve user route
router.post('/approve-user/:userId', authMiddleware, adminMiddleware, approveUser);

// Create product route
router.post('/product', authMiddleware, adminMiddleware, createProduct);

// Get orders route
router.get('/orders', authMiddleware, adminMiddleware, getOrders);

// Update product details
router.put('/product/:productId', authMiddleware, adminMiddleware, updateProduct);

// Update order status
router.put('/orders/:orderId', authMiddleware, adminMiddleware, updateOrderStatus);

// Remove user
router.delete('/users/:userId', authMiddleware, adminMiddleware, removeUser);

// Distributor removes salesperson route
router.delete('/distributor/remove-salesperson/:salespersonId', authMiddleware, removeSalesperson);

module.exports = router;