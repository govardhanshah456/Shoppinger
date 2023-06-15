const express = require("express")
const router = express.Router()
const { upload } = require("../multer")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errroHandler")
const Shop = require("../model/shop")
const Product = require("../model/product")
const fs = require('fs')
const { isSellerAuthenticated, isAuthenticated } = require("../middleware/auth")
router.post("/create-product", upload.array("images"), catchAsyncErrors(async (req, res, next) => {
    try {
        console.log(req.body)
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId)
        if (!shop) {
            return next(new ErrorHandler("Shop Id is invalid!", 500));
        }
        const imageFileNames = [];
        req.files.forEach((img) => {
            imageFileNames.push(img.filename);
        });
        const productData = req.body
        productData.images = imageFileNames
        productData.shop = shop
        const product = await Product.create(productData)
        res.status(201).json({
            success: true,
            product,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.get("/get-all-products-shop/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const param_id = req.params.id
        console.log(param_id)
        const product = await Product.find({ shopId: param_id })
        console.log(product)
        res.status(201).json({
            success: true,
            product,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.put("/create-review/:id", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if (!product) {
            return next(new ErrorHandler("product does not exist!"))
        }
        const { user, rating, comment } = req.body
        const createdAt = Date.now()
        const review = {
            user, rating, comment, id, createdAt
        }
        product.reviews.push(review)
        var stars = 0
        product.reviews.forEach((i) => {
            stars += i.rating
        })
        stars = stars / product.reviews.length
        product.ratings = stars
        await product.save()
        res.status(200).json({
            success: true,
            message: "Review created successfully",
            product,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}))
router.get(
    "/get-all-product",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const products = await Product.find();

            res.status(201).json({
                success: true,
                products,
            });
        } catch (error) {
            return next(new ErrorHandler(error, 400));
        }
    })
);

router.delete("/delete-product/:id", isSellerAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const param_id = req.params.id
        const deleteProd = await Product.findById(param_id)
        if (!deleteProd) {
            return next(new ErrorHandler("Invalid Product ID", 500))
        }
        deleteProd.images.forEach((imageUrl) => {
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
        await Product.findByIdAndDelete(param_id)
        res.status(201).json({
            success: "true",
            message: "Product Deleted Successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))
module.exports = router