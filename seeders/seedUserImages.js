const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const UserImage = require("../models/UserImage");
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose.connect(DB_HOST);

async function seedUserImages() {
  const images = [];
  for (let i = 0; i < 100000; i++) {
    images.push({
      image: faker.image.url(),
    });
  }

  const insertedImages = await UserImage.insertMany(images);

  const users = await User.find();

  const bulkUpdateOperations = [];

  for (const image of insertedImages) {
    const user = users[Math.floor(Math.random() * users.length)];

    user.images.push(image._id);
    user.images_count++;

    bulkUpdateOperations.push({
      updateOne: {
        filter: { _id: user._id },
        update: {
          $set: { images: user.images, images_count: user.images_count },
        },
      },
    });
  }

  // Пакетно обновляем пользователей
  await User.bulkWrite(bulkUpdateOperations);

  console.log("User images seeding completed.");
  mongoose.connection.close();
}

seedUserImages();
