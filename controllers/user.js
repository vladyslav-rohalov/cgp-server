const User = require("../models/User");
const UserImage = require("../models/UserImage");
const { controllerWrapper } = require("../decorators");
const storageUploud = require("../helpers/storageService");

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const pipeline = [];

  pipeline.push({ $sort: { images_count: -1 } });
  pipeline.push({ $skip: (page - 1) * limit });
  pipeline.push({ $limit: limit });

  pipeline.push({
    $lookup: {
      from: "userimages",
      localField: "images",
      foreignField: "_id",
      as: "images",
    },
  });

  pipeline.push({
    $project: {
      _id: 1,
      name: 1,
      city: 1,
      images: "$images.image",
      images_count: 1,
      created_at: 1,
    },
  });

  const users = await User.aggregate(pipeline);

  const total = await User.countDocuments();
  const totalPages = Math.ceil(total / limit);
  const remainingPages = totalPages - page;

  const response = {
    total,
    currentPage: page,
    totalPages,
    remainingPages,
    users,
  };

  res.json(response);
};

const createUser = async (req, res) => {
  const { name, city } = req.body;

  const file = req.file;

  const fileName = await storageUploud(file, "vr", 256);

  const user = await User.create({ name, city });

  const userImage = await UserImage.create({
    image: fileName,
    user: user._id,
  });

  user.images.push(userImage._id);
  user.images_count += 1;
  await user.save();

  res.status(201).json(user);
};

module.exports = {
  getUsers: controllerWrapper(getUsers),
  createUser: controllerWrapper(createUser),
};
