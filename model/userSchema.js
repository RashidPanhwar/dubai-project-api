const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { func } = require('joi');


const createUser = new mongoose.Schema({
    name: {
        firstName: {type: String},
        lastName: {type: String}
    },
    userName: {
        type: String,
        required: [true, "username Required"]
    },
    email: {
        type: String,
        required: [true, "email required"]
    },
    avatar:{
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
     },
    address: [
        {
            city: {type: String, required: true},
            street: {type: String, required: true},
            zipcode: {type: Number, required: true},
            geoLocation: {
                latitude: {type: Number},
                longitude: {type: Number}
            }
        }
    ],
    phone: {type: Number, required: [true, "phone number required"]},
    password: {
        type: String,
        required: [true, 'password required'],
        minLength: [8, "Password must be atleast 8 "],
        select: false,
    },
    role: {
        type: String,
        default: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,

})


// Hash Password
createUser.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// jwt token
createUser.method.getJwtToken = function () {
    return jwt.sign({id: this._id}, process.env.JWT_SECRETE_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// compare password
createUser.method.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', createUser);