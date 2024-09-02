// Example seed script: src/db/seeds/userSeed.js
const mongoose = require('mongoose');
const User = require('../../models/user');

const seedUsers = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const users = [
    { name: 'Admin User', email: 'admin@example.com', password: 'password', role: 'admin', isApproved: true },
    { name: 'Distributor User', email: 'distributor@example.com', password: 'password', role: 'distributor', isApproved: true },
    // Add more users as needed
  ];

  await User.deleteMany();
  await User.insertMany(users);

  console.log('Users seeded!');
  mongoose.disconnect();
};

seedUsers();
