const express = require('express');
const User = require('../model/userSchema');
const router = express.Router();
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncErrors = require('../midleware/catchAsyncErrors');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const sendToken = require('../utils/jwtToken')
const {isAuthenticated, isAdmin} = require('../midleware/auth');
// const catchAsyncErrors = require('../midleware/catchAsyncErrors');

// create User
router.post("/create-user", async(req, res, next) => {
    try{
        const {name, email, password} = req.body;
        const userEmail = await User.findOne({email});
        if(userEmail){
            return next(new ErrorHandler("User already exist"));
        }
        const user = {
            name: name,
            email: email,
            password: password
        };
        const activationToken = createActivationToken(user);
        const activationUrl = `http://localhost:500/api/v1/user/create-user/activation/${activationToken}`;
        try{
            await sendMail({
                email: user.email,
                subject: "Activate Your Account",
                message: `Hello ${user.name} please click on the link to activate your account: ${activationUrl}`,
            });
            res.status(201).json({
                success: true,
                message: `Please check your email:- ${user.email} to activate your account`,
            });

        }catch(err){
            return next(new ErrorHandler(err.message, 500));
        }
    }catch(err) {
        return next(new ErrorHandler(err.message, 400));
    }
});

// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRETE, {
        expiresIn: "5m",
    });
};

// active user
router.post("/activation", catchAsyncErrors(async(req, res, next) => {
    try{
        const {activation_token} = req.body;

        const newUser = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRETE
        );

        if(!newUser) {
            return next(new ErrorHandler("Invalid Token", 400));
        }
        const {name, email, password} = newUser;
        let user = await User.findOne({ email });

        if(user){
            return next(new ErrorHandler("User already exist", 400));
        }

        user = await User.create({
            name,
            email,
            password,
        })
        sendToken(user, 201, res);

    }catch(err){
        return next(new ErrorHandler(err.message, 500));
    }
})
);

// login user
router.post("/login-user", catchAsyncErrors( async(req, res, next) => {
    try{
        const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("USer does not exist", 400));
    }

    const isPAsswordValid = await User.comparePassword(password);
    if(!isPAsswordValid){
        return next(new ErrorHandler("incorrect password"));
    }
    sendToken(user, 201, res);

    }catch(err){
        return next(new ErrorHandler(err.message, 500));
    }
}));

// load user
router.get("/get-user", isAuthenticated, catchAsyncErrors(async(req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return next(new ErrorHandler("user doesn't exist", 400));
        }
        res.status(200).json({
            success: true,
            user,
        });

    }catch(err){
        return next(new ErrorHandler(err.message, 500));
    }
}));

// log out user
router.get("/log-out", catchAsyncErrors(async(req, res, next) => {
    try{
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });
        res.status(200).json({
            success: true,
            message: "Log out successful",
        });

    }catch(err){
        return next(new ErrorHandler(err.message, 500));
    }
}))

// update user info
router.put("/update-user-info", catchAsyncErrors(async(req, res, next) => {
    try{
        const {email, password, phone, name} = req.body;
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorHandler("User not found", 400));
        }
        const isPAsswordValid = await User.comparePassword(password);
        if(!isPAsswordValid){
            return next(new ErrorHandler("PAssword invalid", 400));
        }
        user.name = name;
        user.email = email;
        user.phone = phone;
        
        await user.save();

        res.status(201).json({
            success: true,
            user,
        })

    }catch(err){
        return next(new ErrorHandler(err.message, 500));
    }
}));

// update avatar
// Add after

// update user addresses
router.put("/update-user-address", isAuthenticated, catchAsyncErrors(async(req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        const sameTypeAddress = user.addresses.find(
            (address) => address.addressType === req.body.addressType
        );
        if(sameTypeAddress){
            return next(new ErrorHandler("address already exist", ));
        }
        const existAddress = user.addresses.find(
            address => address._id === req.body._id
        );
        if(existAddress){
            Object.assign(existAddress, req.body);
        }else{
            user.addresses.push(req.body);
        }
        await user.save();
        res.status(201).json({
            success: true,
            user,
        });

    }catch(err){
        return next(new ErrorHandler(err.message, 500));
    }
}))

module.exports = router;

