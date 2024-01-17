const mongoose = require('mongoose');
const User = require('./userSchema');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "category required"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {type: Date, default: Date.now},
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedAt: {type: Date}

})

module.exports = mongoose.model("Category", categorySchema);