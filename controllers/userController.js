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
  
      if (users?.length === 0 || users === null) {
        return res.status(404).json({ status: 404, message: 'Users not found.' });
      }
  
      return res.status(200).json({ status: 200, data: users, message: 'Successfully Retrieved Users' });
  });
};

exports.getUserBySSN = async (req, res) => {
  await doActionThatMightFailValidation (req, res, async () => {
      const {SSN} = req.params;
      const users = await UserService.getUserBySSN({SSN: SSN});
  
      if (users?.length === 0 || users === null) {
        return res.status(404).json({ status: 404, message: 'User not found.' });
      }
  
      return res.status(200).json({ status: 200, data: users, message: 'Successfully Retrieved User' });
  });
};

// Check to see if potential 409 error
exports.postUser = async (req, res) => {
  await doActionThatMightFailValidation (req, res, async () => {
    const user = await UserService.postUser(req.body);
    return res.status(201).json({ status: 201, data: user, message: 'Successfully Created User' });
  });
};

exports.deleteUsers = async(req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const result = await UserService.deleteUsers(req.query);
    if (result?.deleteCount > 0) {
        return res.status(200).json({status: 200, data: result, message:'Successfully Deleted Users'});
    }
    else {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    }
  });
}

exports.deleteUserBySSN = async(req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const {SSN} = req.params;
    const result = await UserService.deleteUserBySSN({SSN: SSN});
    if (result?.deleteCount > 0) {
        return res.status(200).json({status: 200, data: result, message:'Successfully Deleted User'});
    }
    else {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    }
  });
}

exports.putUserBySSN = async(req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const {SSN} = req.params;
    const user = req.body;
    user.SSN = SSN;
    const result = await UserService.putUserbySSN({SSN: user.SSN}, user);
    if (result?.deleteCount > 0) {
        return res.status(200).json({status: 200, data: result, message:'Successfully Replaced User'});
    }
    else {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    }
  });
}

exports.patchUserBySSN = async(req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const {SSN} = req.params;
    const user = req.body;
    delete user.SSN;
    const result = await UserService.patchUserBySSN({SSN: SSN}, user);
    if (result?.deleteCount > 0) {
        return res.status(200).json({status: 200, data: result, message:'Successfully Updated User'});
    }
    else {
      return res.status(404).json({ status: 404, message: 'User not found.' });
    }
  });
}
