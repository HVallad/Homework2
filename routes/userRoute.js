const Express = require('express');

const Router = Express.Router();

const UserController = require('../controllers/userController');

Router.get('/', UserController.getUsers);

Router.get('/:SSN', UserController.getUserBySSN);

Router.post('/', UserController.postUser);

module.exports = Router;
