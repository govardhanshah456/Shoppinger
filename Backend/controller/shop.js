const express = require("express")
const router = express.Router()
const path = require("path")
const jwt = require("jsonwebtoken")
const { upload } = require("../multer")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const shop = require("../model/shop")
const fs = require("fs")
const ErrorHandler = require("../utils/errroHandler")
const sendShopToken = require("../utils/sendShopToken")
const sendMail = require("../utils/sendMail")
const { isSellerAuthenticated } = require("../middleware/auth")
router.post("/create-shop", upload.single("file"), catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, password, address, zipCode, phoneNumber } = req.body

        const exist = await shop.findOne({ email })
        if (exist) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: err });
                }

            })
            return next(new ErrorHandler("User Already Exist", 500))
        }
        const filename = req.file.filename
        const fileUrl = path.join(filename)
        console.log(fileUrl)
        const seller = {
            name,
            email,
            password,
            address,
            zipCode,
            phoneNumber,
            avatar: fileUrl,
        }
        const activationToken = createActivationToken(seller)
        const encodedToken = Buffer.from(activationToken).toString('base64');
        const activationUrl = `http://localhost:3000/seller/activation/${encodedToken}`

        try {
            await sendMail({
                email: seller.email,
                subject: "Activate your Shop",
                message: `Hello ${seller.name}, please click on the link to activate your virtual shop: ${activationUrl}`,
            });
            res.status(201).json({
                success: true,
                message: `please check your email:- ${seller.email} to activate your shop!`,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

router.post("/activation", catchAsyncErrors(async (req, res, next) => {
    try {
        let { activation_token } = (req.body)
        // console.log(activation_token)
        let decoded = Buffer.from(activation_token, 'base64').toString('ascii')
        console.log("Here")
        // console.log(decoded)
        let newSeller = jwt.verify(decoded, process.env.ACTIVATION_SECRET)
        if (!newSeller) {
            return next(new ErrorHandler("Invalid Token", 400))
        }
        console.log("Now Here")
        let { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller
        let seller = await shop.findOne({ email })
        if (seller) {
            return next(new ErrorHandler("Seller Already Exists", 400))
        }
        newSeller = await shop.create({
            name,
            email,
            password,
            avatar,
            zipCode,
            address,
            phoneNumber
        })
        console.log(newSeller)
        sendShopToken(newSeller, 201, res)


        await sendMail({
            email: newSeller.email,
            subject: "Welcome to Shoppinger",
            message: `Hello ${newSeller.name}, Welcome to Shoppinger Your Seller-Email is Activated Succesfully.`
        }).catch((err) => {
            console.log(err)
        })

    }
    catch (error) {
        return next(ErrorHandler(error.message, 500))
    }
}))

router.post("/shop-login", catchAsyncErrors(async (req, res, next) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorHandler("Please provide the all fields!", 400));
        }

        const seller = await shop.findOne({ email }).select("+password");

        if (!seller) {
            return next(new ErrorHandler("Seller doesn't exists!", 400));
        }

        const isPasswordValid = seller.comparePassword(password);

        if (!isPasswordValid) {
            return next(
                new ErrorHandler("Please provide the correct login Credentials", 400)
            );
        }
        console.log("here reached")
        sendShopToken(seller, 201, res);
        console.log("here reached1")

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.get(
    "/getSeller",
    isSellerAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            const seller = await shop.findById(req.seller._id);


            if (!seller) {
                return next(new ErrorHandler("User doesn't exists", 400));
            }

            res.status(200).json({
                success: true,
                seller,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);
router.get("/get-shop-info/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const seller = await shop.findById(req.params.id)
        res.status(201).json({
            success: true,
            seller,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
router.get(
    "/logout",
    catchAsyncErrors(async (req, res, next) => {
        try {
            res.cookie("seller_token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            });
            res.status(201).json({
                success: true,
                message: "Log out successful!",
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);
module.exports = router