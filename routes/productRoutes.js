const express = require('express');
const {createProduct, getAllProducts, getSingleProduct} = require('../controller/productController');

const router = express.Router();

router.post('/createProduct', createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getSingleProduct/:productId', getSingleProduct);



module.exports = router;