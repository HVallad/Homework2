const Express = require('express');

const Router = Express.Router();

const UserController = require('../controllers/userController');

Router.get('/', UserController.getUsers);

Router.get('/:SSN', UserController.getUsers);

Router.put('/', UserController.putUser);

module.exports = Router;
