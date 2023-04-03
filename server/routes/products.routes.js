const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken');
const {
  addProduct,
  getProductByCategory,
} = require('../controllers/products.controller');

router.post('/', verifyToken, addProduct);

router.get('/category', getProductByCategory);

module.exports = router;
