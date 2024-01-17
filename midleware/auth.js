const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const User = require('../model/userSchema');
// const catchAsyncErrors = require('./catchAsyncErrors');

// User Authentication
exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to continue", 401));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRETE_KEY);
    req.user = await User.findById(decode, id);
    next();
});

// exports.isSeller = catchAsyncErrors(async(req, res, next) => {
//     const {seller_token} = req.cookies;
//     if(!seller_token){
//         return next(new ErrorHandler("please login to continue", 401));
//     }
//     const decode = jwt.verify(seller_token, process.env.JWT_SECRETE_KEY);

// })

exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} can not access this resources`))
        }
    }
}

