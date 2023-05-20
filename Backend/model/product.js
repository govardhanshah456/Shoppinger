const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product name!"],
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description!"],
    },
    category: {
        type: String,
        required: [true, "Please Enter product category!"],
    },
    tags: {
        type: String,
    },
    originalPrice: {
        type: Number,

    },
    discountedPrice: {
        type: Number,
        required: [true, "Please Enter product price!"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product stock!"],
    },
    images: [
        {
            type: String,
        }
    ],
    shopId: {
        type: String,
        required: true,
    },
    shop: {
        type: Object,
        required: true,
    },
    sold_out: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})
module.exports = mongoose.mongoose.model("Product", productSchema)