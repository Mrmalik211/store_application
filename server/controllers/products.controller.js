const createError = require('../middlewares/error');
const Product = require('../models/Products');
const User = require('../models/User');

const addProduct = async (req, res, next) => {
  try {
    const findUser = await User.findById(req.user.id);
    if (!findUser) return next(createError(404, 'User Not Found'));

    if (findUser.isSeller === false)
      return next(createError(401, 'Only Seller Can Add Products'));

    const product = Product({...req.body, userId: req.user.id});
    const saveProduct = await product.save();
    return res.status(200).json(saveProduct);
  } catch (error) {
    next(error);
  }
};

const getProductByCategory = async (req, res, next) => {
  const category = req.query.category?.split(',');
  try {
    const products = await Product.find({category: {$in: category}}).limit(20);
    if (products.length === 0)
      return next(createError(404, 'No Product Found'));
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getProductByCategory,
};
