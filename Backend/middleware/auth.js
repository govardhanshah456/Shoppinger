const ErrorHandler = require("../utils/errroHandler")

const catchAsyncErrors = require("./catchAsyncErrors")

const jwt = require("jsonwebtoken")

// const catchAsyncErrors = require("./catchAsyncErrors")

const User = require("../model/user");
const shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    console.log(token)
    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});

exports.isSellerAuthenticated = catchAsyncErrors(async (req, res, next) => {
    try {
        const { seller_token } = req.cookies;
        console.log(seller_token)
        if (!seller_token) {
            return next(new ErrorHandler("Please login as seller to continue", 401));
        }

        const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

        req.seller = await shop.findById(decoded.id);
        console.log("here now")

        next();
    } catch (error) {
        console.log(error)
        next()
    }

});