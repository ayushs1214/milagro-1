const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isApproved = true;
    await user.save();

    res.status(200).json({ message: 'User approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, moq } = req.body;

  try {
    const product = new Product({ name, price, moq });
    await product.save();

    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
