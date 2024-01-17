const express = require('express');
const {createCategory, getAllCategories, getCategoryById} = require('../controller/categoryController');

const router = express.Router();

router.post('/createCategory', createCategory);
router.get('/getAllCategories', getAllCategories);
router.get('/getCategoryById/:id', getCategoryById);

module.exports = router;