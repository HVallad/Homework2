const User = require('../models/user');

exports.getUsers = async (query) => User.find(query).select('-_id -__v');

exports.getUserBySSN = async (SSN) => User.findOne(SSN).select('-_id -__v');

exports.postUser = async (body) => new User(body).save();

exports.deleteUsers = async (query) => User.deleteMany(query);

exports.deleteUserBySSN = async (SSN) => User.deleteOne(SSN);

exports.putUserbySSN = async (SSN, user) => User.findOneAndReplace(SSN, user, { upsert: true });

exports.patchUserBySSN = async (SSN, user) => User.findOneAndUpdate(SSN, user, { new: true }).select('-_id -__v');
