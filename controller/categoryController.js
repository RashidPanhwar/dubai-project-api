const express = require('express');
const User = require('../model/userSchema');
const Category = require('../model/categorySchema');
const catchAsyncError = require('../midleware/catchAsyncErrors');



exports.createCategory = catchAsyncError( async(req, res) => {
    const {category} = req.body;
    const userId = "65a3b4867df5d1edafcd5f0a"
    try{
    const loggedInUserId = await User.findById(userId);
    if(!loggedInUserId){
        return res.status(404).json({error: "UserNot Find"});
    }
    const newCategory = new Category({
        category,
        createdBy: loggedInUserId._id,
        updatedBy: loggedInUserId._id
    });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
    }catch(error){
        res.status(500).json({error: "Internal server error"});
    }
} )

exports.getAllCategories = catchAsyncError( async(req, res) => {
    const getCategories = await Category.find();
    res.status(200).json({success: true, getCategories});
})

exports.getCategoryById = catchAsyncError(async(req, res) => {
    const {id} = req.params;
    const getSingleCategory = await Category.findById(id);
    res.status(200).json({success: true, getSingleCategory});
})