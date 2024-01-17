const catchAsyncErrors = require('../midleware/catchAsyncErrors');
const Products = require('../model/productsSchema');

exports.createProduct = catchAsyncErrors( async(req, res) => {
    const addProduct = await Products.create(req.body);
    res.status(201).json({success: true, addProduct});
})

exports.getAllProducts = catchAsyncErrors( async(req, res) => {
    const showProducts = await Products.find();
    res.status(200).json({success: true, showProducts});
})

exports.getSingleProduct = catchAsyncErrors( async(req, res) => {
    const {productId} = req.params;
    const showSingleProduct = await Products.findById(productId);
    res.status(200).json({success: true, showSingleProduct});
})