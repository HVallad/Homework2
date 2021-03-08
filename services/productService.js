const Product = require('../models/product');

exports.getProducts = async (query) => {
  try {
    return await Product.find(query);
  } catch (e) {
    throw Error('Error while Paginating products');
  }
};
