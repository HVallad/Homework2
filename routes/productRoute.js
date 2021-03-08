const Express = require('express');

const Router = Express.Router();

const ProductController = require('../controllers/productController');

Router.get('/', ProductController.getProducts);

Router.post('/', ProductController.postProduct);

Router.delete('/', ProductController.deleteProducts);

Router.get('/:SKU', ProductController.getProductBySKU);

Router.delete('/:SKU', ProductController.deleteProductBySKU);

Router.put('/:SKU', ProductController.putProductBySKU);

Router.patch('/:SKU', ProductController.patchProductBySKU);

module.exports = Router;