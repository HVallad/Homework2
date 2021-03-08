const User = require('../models/user');

exports.getUsers = async (query) => {
  try {
    return await User.find(query).select('-_id -__v');
  } catch (e) {
    throw Error('Error while grabbing users.');
  }
};

exports.getUserBySSN = async (SSN) => {
  try {
    return await User.findOne(SSN).select('-_id -__v');
  } catch (e) {
    throw Error('Error while grabbing users.');
  }
};

exports.postUser = async (body) => {
  try {
    return await new User(body).save();
  } catch (e) {
    throw Error('Error while creating user.');
  }
};

exports.deleteUsers = async (query) => {
  try {
    return await User.deleteMany(query);
  } catch (e) {
    throw Error('Error while deleting users.');
  }
};

exports.deleteUserBySSN = async (SSN) => {
  try {
    return await User.deleteOne(SSN);
  } catch (e) {
    throw Error('Error while deleting user.');
  }
};

exports.putUserbySSN = async (SSN, user) => {
  try {
    return await User.findOneAndReplace(SSN, user, { upsert: true, });
  } catch (e) {
    throw Error('Error while replacing user information.');
  }
};

exports.patchUserBySSN = async (SSN, user) => {
  try {
    return await User.findOneAndUpdate(SSN, user, { new: true,}).select('-_id -__v');
  } catch (e) {
    throw Error('Error while updating user information')
  }
};


