const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

// Approve user controller
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

// Create product controller
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

// Get all orders controller
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product controller
exports.updateProduct = async (req, res) => {
  const { name, price, moq } = req.body;

  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.moq = moq || product.moq;

    await product.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update order status controller
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove user from the system
exports.removeUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Distributor removes their salesperson
exports.removeSalesperson = async (req, res) => {
  try {
    // Find the distributor (the one making the request)
    const distributor = await User.findById(req.user.userId);

    // Ensure the user requesting is a distributor
    if (distributor.role !== "DISTRIBUTOR") {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }

    // Find the salesperson by ID
    const salesperson = await User.findById(req.params.salespersonId);

    // Ensure the salesperson exists
    if (!salesperson) {
      return res.status(404).json({ message: 'Salesperson not found' });
    }

    // Ensure the salesperson works for this distributor
    if (salesperson.dealerEmail !== distributor.email) {
      return res.status(403).json({ message: 'You can only remove salespeople associated with your dealership' });
    }

    // Remove the salesperson
    await salesperson.remove();

    res.status(200).json({ message: 'Salesperson removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};