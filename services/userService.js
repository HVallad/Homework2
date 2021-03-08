const User = require('../models/user');

exports.getUsers = async (query) => {
  try {
    return await User.find(query).select('-_id -__v');
  } catch (e) {
    throw Error('Error while grabbing users.');
  }
};

exports.getUserBySSN = async (param) => {
  try {
    return await User.findOne({SSN: param.SSN}).select('-_id -__v');
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
}

exports.deleteUserBySSN = async (params) => {
  try {
    return await User.deleteOne({SSN: params.SSN});
  } catch (e) {
    throw Error('Error while deleting user.');
  }
}


