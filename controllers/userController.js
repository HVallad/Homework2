const UserService = require('../services/userService');

exports.getUsers = async (req, res) => {
  try {
    const query = req.params !== {} ? req.params : req.query;

    const users = await UserService.getUsers(query);

    if (users?.length === 0) {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    }

    return res.status(200).json({ status: 200, data: users, message: 'Successfully Retrieved User(s)' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.putUser = async (req, res) => {
  // Validate request parameters, queries using express-validator
  try {
    const user = await UserService.putUser(req.query);
    return res.status(201).json({ status: 201, data: user, message: 'Successfully created User' });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
