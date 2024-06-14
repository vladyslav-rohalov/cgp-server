const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../models/User");
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose.connect(DB_HOST);

async function seedUsers() {
  const users = [];

  for (let i = 0; i < 10000; i++) {
    users.push({
      name: faker.internet.userName(),
      city: faker.location.city(),
    });
  }

  await User.insertMany(users);

  mongoose.connection.close();
}

seedUsers();
