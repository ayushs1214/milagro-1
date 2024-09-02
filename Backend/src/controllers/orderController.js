const Order = require('../models/order');

exports.placeOrder = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const order = new Order({ productId, quantity, userId: req.user.userId });
    await order.save();

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order.status);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
