const Express = require('express');

const Router = Express.Router();

const UserController = require('../controllers/userController');

Router.get('/', UserController.getUsers);

Router.post('/', UserController.postUser);

Router.delete('/', UserController.deleteUsers);

Router.get('/:SSN', UserController.getUserBySSN);

Router.delete('/:SSN', UserController.deleteUserBySSN);

Router.put('/:SSN', UserController.putUserBySSN);

Router.patch('/:SSN', UserController.patchUserBySSN);

module.exports = Router;
