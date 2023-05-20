const express = require("express")
const router = express.Router()
const { upload } = require("../multer")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const ErrorHandler = require("../utils/errroHandler")
const Shop = require("../model/shop")
const event = require("../model/event")
const Event = require("../model/event")
const fs = require('fs')
const { isSellerAuthenticated } = require("../middleware/auth")
router.post("/create-event", upload.array("images"), catchAsyncErrors(async (req, res, next) => {
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
        const eventData = req.body
        eventData.images = imageFileNames
        eventData.shop = shop
        const event = await Event.create(eventData)
        res.status(201).json({
            success: true,
            event,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.get("/get-all-events-shop/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const param_id = req.params.id
        console.log(param_id)
        const event = await Event.find({ shopId: param_id })
        res.status(201).json({
            success: true,
            event,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.get("/get-all-events", catchAsyncErrors(async (req, res, next) => {
    try {
        const event = await Event.find()
        res.status(201).json({
            success: true,
            event,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

router.delete("/delete-event/:id", isSellerAuthenticated, catchAsyncErrors(async (req, res, next, err) => {
    console.log("inside here")
    try {
        console.log("inside here")
        const param_id = req.params.id
        const deleteProd = await Event.findById(param_id)
        if (!deleteProd) {
            return next(new ErrorHandler("Invalid Event ID", 500))
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
        await Event.findByIdAndDelete(param_id)
        res.status(201).json({
            success: "true",
            message: "event Deleted Successfully!"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))
module.exports = router