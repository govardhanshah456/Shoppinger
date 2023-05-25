const express = require("express")
const router = express.Router()
const catchAsyncError = require("../middleware/catchAsyncErrors")
const couponCode = require("../model/couponCode")
const ErrorHandler = require("../utils/errroHandler")
const { isSellerAuthenticated } = require("../middleware/auth")
router.post("/create-coupon-code", catchAsyncError(async (req, res, next) => {
    console.log(req.body)
    const exist = await couponCode.find({ name: req.body.name })
    console.log(exist)
    if (exist.length != 0) {
        return next(new ErrorHandler("CouponCode Already Exists!", 400))
    }
    const createCouponCode = await couponCode.create(req.body)
    res.status(201).json({
        success: true,
        createCouponCode,
    })
}))
router.get("/get-coupon/:id", isSellerAuthenticated, catchAsyncError(async (req, res, next) => {
    const id = req.params.id
    const details = await couponCode.find({ shopId: id })
    if (!details) {
        return next(new ErrorHandler("No Such Seller Exist!", 400))
    }
    res.status(201).json({
        success: true,
        details,
    })
}))
router.delete("/delete-coupon/:id", isSellerAuthenticated, catchAsyncError(async (req, res, next) => {
    const id = req.params.id
    const exist = await couponCode.findById(id)
    if (!exist) {
        return next(new ErrorHandler("No Such Product Exist!", 400))
    }
    await couponCode.findByIdAndDelete(id)
    res.status(201).json({
        success: true,
        message: "Deletion Successful!"
    })
}))
module.exports = router