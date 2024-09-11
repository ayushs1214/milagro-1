const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/auth');
const nodemailer = require('nodemailer');

// Register controller with role-based logic
exports.register = async (req, res) => {
  const { name, email, password, role, dealerEmail } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Verify if a valid role is selected
    const validRoles = ["DISTRIBUTOR", "SALESPERSON", "ARCHITECT", "BUILDER"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    // If role is "SALESPERSON", verify the dealer's email
    if (role === "SALESPERSON") {
      const dealer = await User.findOne({ email: dealerEmail, role: "DISTRIBUTOR" });
      if (!dealer) {
        return res.status(404).json({ message: 'Dealer not found or not approved' });
      }
      // Optional: You can send an email for dealer verification
      sendVerificationEmail(dealerEmail);
    }

    user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Optional: Function to send email to dealer for salesperson verification
const sendVerificationEmail = (dealerEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: dealerEmail,
    subject: 'Verify Salesperson',
    text: 'A salesperson has registered under your dealership. Please verify their details.',
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};