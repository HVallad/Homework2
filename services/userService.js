const User = require('../models/user');

exports.getUsers = async (query) => {
  try {
    return await User.find(query).select('-_id -__v');
  } catch (e) {
    throw Error('Error while grabbing users.');
  }
};

exports.putUser = async (body) => {
  try {
    return await new User(body).save();
  } catch (e) {
    throw Error('Error while creating user.');
  }
};
