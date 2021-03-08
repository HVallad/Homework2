const Product = require('../models/product');

exports.getProducts = async (query) => Product.find(query).select('-_id -__v');

exports.getProductBySKU = async (SKU) => Product.findOne(SKU).select('-_id -__v');

exports.postProduct = async (body) => new Product(body).save();

exports.deleteProducts = async (query) => Product.deleteMany(query);

exports.deleteProductBySKU = async (SKU) => Product.deleteOne(SKU);

// eslint-disable-next-line max-len
exports.putProductBySKU = async (SKU, product) => Product.findOneAndReplace(SKU, product, { upsert: true });

exports.patchProductBySKU = async (SKU, product) => Product.findOneAndUpdate(SKU, product, { new: true }).select('-_id -__v');
