const express = require('express');
var app = express();
var router = express.Router();

/**Imported Controller modules*/
var auth = require('../controller/AuthController');
var category = require('../controller/CategoryController');
var product = require('../controller/ProductController');
var cart = require('../controller/CartController');
var authCheck = require('../middleware/checkValidToken');

/**Auth routes*/
router.post('/auth/login',auth.login);
router.post('/auth/register',auth.register);

/**Category routes*/
router.get('/category/index',authCheck,category.index);
router.post('/category/create',authCheck,category.create);
router.put('/category/update/:category_id',authCheck,category.update);
router.delete('/category/delete/:category_id',authCheck,category.deleteCategory);

/**Product routes*/
router.get('/product/index',authCheck,product.index);
router.post('/product/create',authCheck,product.create);
router.put('/product/update/:product_id',authCheck,product.update);
router.delete('/product/delete/:product_id',authCheck,product.deleteProduct);

/**Cart routes*/
router.get('/cart/index',authCheck,cart.index);
router.post('/cart/create',authCheck,cart.create);
router.put('/cart/update/:cart_id',authCheck,cart.updateCartQuantity);
router.delete('/cart/delete/:cart_id',authCheck,cart.deleteCart);


module.exports=router;