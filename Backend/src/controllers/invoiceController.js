const Invoice = require('../models/Invoice');
const Order = require('../models/order');

// Admin creates an invoice
exports.createInvoice = async (req, res) => {
  const { dealerId, orderId, totalAmount } = req.body;

  try {
    const invoice = new Invoice({
      dealerId,
      orderId,
      totalAmount,
      status: 'Pending',
    });

    await invoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};