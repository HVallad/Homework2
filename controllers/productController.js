const ProductService = require('../services/productService');

// eslint-disable-next-line consistent-return
const doActionThatMightFailValidation = async (req, res, action) => {
  try {
    await action();
  } catch (e) {
    if (e.code === 11000 || e.stack.includes('ValidationError') || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')) {
      return res.status(400).json({ status: 400, message: e });
    }

    return res.status(500).json({ status: 500, message: 'Something went wrong...', error: e });
  }
};

exports.getProducts = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const products = await ProductService.getProducts(req.query);

    if (products?.length === 0 || products === null) {
      return res.status(404).json({ status: 404, message: 'Products not found.' });
    }

    return res.status(200).json({ status: 200, data: products, message: 'Successfully Retrieved Products' });
  });
};

exports.getProductBySKU = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const { SKU } = req.params;
    const products = await ProductService.getProductBySKU({ SKU });

    if (products?.length === 0 || products === null) {
      return res.status(404).json({ status: 404, message: 'Product not found.' });
    }

    return res.status(200).json({ status: 200, data: products, message: 'Successfully Retrieved Product' });
  });
};

// Check to see if potential 409 error
exports.postProduct = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const product = await ProductService.postProduct(req.body);
    return res.status(201).json({ status: 201, data: product, message: 'Successfully Created Product' });
  });
};

exports.deleteProducts = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const result = await ProductService.deleteProducts(req.query);
    if (result?.deleteCount > 0) {
      return res.status(200).json({ status: 200, data: result, message: 'Successfully Deleted Products' });
    }

    return res.status(404).json({ status: 404, message: 'Product not found.' });
  });
};

exports.deleteProductBySKU = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const { SKU } = req.params;
    const result = await ProductService.deleteProductBySKU({ SKU });
    if (result?.deleteCount > 0) {
      return res.status(200).json({ status: 200, data: result, message: 'Successfully Deleted Product' });
    }

    return res.status(404).json({ status: 404, message: 'Product not found.' });
  });
};

exports.putProductBySKU = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const { SKU } = req.params;
    const product = req.body;
    product.SKU = SKU;
    const result = await ProductService.putProductBySKU({ SKU: product.SKU }, product);
    if (result?.deleteCount > 0) {
      return res.status(200).json({ status: 200, data: result, message: 'Successfully Replaced Product' });
    }

    return res.status(404).json({ status: 404, message: 'Product not found.' });
  });
};

exports.patchProductBySKU = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const { SKU } = req.params;
    const product = req.body;
    delete product.SKU;
    const result = await ProductService.patchProductBySKU({ SKU }, product);
    if (result?.deleteCount > 0) {
      return res.status(200).json({ status: 200, data: result, message: 'Successfully Updated Product' });
    }

    return res.status(404).json({ status: 404, message: 'Product not found.' });
  });
};
