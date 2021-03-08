const UserService = require('../services/userService');

const doActionThatMightFailValidation = async (req, res, action) => {
  try {
    await action();
  } catch (e) {

    if (e.code === 11000 || e.stack.includes('ValidationError') || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')) {
      return res.status(400).json({status: 400, message: e});
    }

    return res.status(500).json({status:500, message: 'Something went wrong...', error:e})
  }
};

exports.getUsers = async (req, res) => {
  await doActionThatMightFailValidation (req, res, async () => {
      const users = await UserService.getUsers(req.query);
  
      if ( users === null || users.length === 0) {
        return res.status(404).json({ status: 404, message: 'Users not found.' });
      }
  
      return res.status(200).json({ status: 200, data: users, message: 'Successfully Retrieved Users' });
  });
};

exports.getUserBySSN = async (req, res) => {
  await doActionThatMightFailValidation (req, res, async () => {
      const users = await UserService.getUserBySSN(req.params);
  
      if (users === null || users.length === 0) {
        return res.status(404).json({ status: 404, message: 'User not found.' });
      }
  
      return res.status(200).json({ status: 200, data: users, message: 'Successfully Retrieved User' });
  });
};

exports.postUser = async (req, res) => {
  await doActionThatMightFailValidation (req, res, async () => {
    const user = await UserService.postUser(req.query);
    return res.status(201).json({ status: 201, data: user, message: 'Successfully Created User' });
  });
};

exports.deleteUsers = async(req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const result = await UserService.deleteUsers(req.query);
    if (results !== null && result.deleteCount > 0) {
        return res.status(200).json({status: 200, data: result,message:'Successfully Deleted Users'});
    }
    else {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    }
  });
}

exports.deleteUsers = async(req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const result = await UserService.deleteUserBySSN(req.params);
    if (results !== null && result.deleteCount > 0) {
        return res.status(200).json({status: 200, data: result,message:'Successfully Deleted Users'});
    }
    else {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    }
  });
}
