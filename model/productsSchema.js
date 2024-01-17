const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    category: {type: mongoose.Schema.Types.ObjectId},
    title: {
        type: String,
        required: [true, "title required"]
    },
    description: {
        type: String,
        required: [true, "Description required"]
    },
    brand: {
        type: String,
        required: [true, "Brand Required"]
    },
    price: {
        type: Number,
        required: [true, "Price required"]
    },
    images: [
        {
            public_id: {
                type: String, required: [true]
            },
            uri: {
                type: String, required: [true]
            }
        }
    ],
    location: [
        {
            city: {type: String},
            address: {type: String},
            latitude: {type: Number},
            longitude: {type: Number}
        }
    ],
    // phone: {
    //     type: Number,
    //     required: [true, "Number required"]
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    },
    updatedAt: {type: Date},
    updatedBy: {
        type: String
    }
})



module.exports = mongoose.model("Products", productSchema);