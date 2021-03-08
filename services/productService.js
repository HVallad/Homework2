const Product = require('../models/product');

exports.getProducts = async (query) => {
  try {
    return await Product.find(query).select('-_id -__v');
  } catch (e) {
    throw Error('Error while grabbing products.');
  }
};

exports.getProductBySKU = async (SKU) => {
  try {
    return await Product.findOne(SKU).select('-_id -__v');
  } catch (e) {
    throw Error('Error while grabbing products.');
  }
};

exports.postProduct = async (body) => {
  try {
    return await new Product(body).save();
  } catch (e) {
    throw Error('Error while creating product.');
  }
};

exports.deleteProducts = async (query) => {
  try {
    return await Product.deleteMany(query);
  } catch (e) {
    throw Error('Error while deleting products.');
  }
};

exports.deleteProductBySKU = async (SKU) => {
  try {
    return await Product.deleteOne(SKU);
  } catch (e) {
    throw Error('Error while deleting product.');
  }
};

exports.putProductbySKU = async (SKU, product) => {
  try {
    return await Product.findOneAndReplace(SKU, product, { upsert: true, });
  } catch (e) {
    throw Error('Error while replacing product information.');
  }
};

exports.patchProductBySKU = async (SKU, product) => {
  try {
    return await Product.findOneAndUpdate(SKU, product, { new: true,}).select('-_id -__v');
  } catch (e) {
    throw Error('Error while updating product information')
  }
};


