const express = require('express');
const { createInvoice } = require('../controllers/invoiceController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createInvoice);

module.exports = router;