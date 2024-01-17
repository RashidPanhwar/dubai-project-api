const { object } = require('joi');
const ErrorHandler = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statuCode = err.statuCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resources not found with this id.. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate key ${object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if(err.name === "jsonwebtokenError"){
        const message = `Invalid url please try again letter`;
        err = new ErrorHandler(message, 400);
    }

    // jwt expire
    if(err.name === "TokenExpiredError"){
        const message = `Expired url please try again letter`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statuCode).json({
        success: false,
        err: message
    });
};