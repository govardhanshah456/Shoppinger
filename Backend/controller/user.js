const express = require('express')
const path = require("path")
const router = express.Router()
const { upload } = require("../multer")
const User = require('../model/user')
const ErrorHandler = require('../utils/errroHandler')
const fs = require("fs")
const jwt = require("jsonwebtoken")
const sendMail = require('../utils/sendMail')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const passport = require("passport")
const sendToken = require('../utils/jwtToken')
const { isAuthenticated } = require('../middleware/auth')
router.post("/create-user", upload.single('file'), async (req, res, next) => {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Error deleting file" });
            }
        });
        return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
    };
    const activationToken = createActivationToken(user)
    const encodedToken = Buffer.from(activationToken).toString('base64');

    console.log(activationToken)
    const activationUrl = `http://localhost:3000/activation/${encodedToken}`
    try {
        await sendMail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });
        res.status(201).json({
            success: true,
            message: `please check your email:- ${user.email} to activate your account!`,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }


})
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "10m",
    })
}
router.post("/activation", catchAsyncErrors(async (req, res, next) => {
    try {
        const { activation_token } = (req.body)
        console.log(activation_token)
        const decoded = Buffer.from(activation_token, 'base64').toString('ascii')
        const newUser = jwt.verify(decoded, process.env.ACTIVATION_SECRET)
        if (!newUser) {
            return next(new ErrorHandler("Invalid Token", 400))
        }
        const { name, email, password, avatar } = newUser
        let user = await User.findOne({ email })
        if (user) {
            return next(new ErrorHandler("User Already Exists", 400))
        }
        newUser = await User.create({
            name,
            email,
            password,
            avatar,
        })
        sendToken(newUser, 201, res)
    }
    catch (err) {
        return next(new ErrorHandler("Error:" + err.message, 400))
    }
}))
router.post(
    "/login-user",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return next(new ErrorHandler("Please provide the all fields!", 400));
            }

            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                return next(new ErrorHandler("User doesn't exists!", 400));
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return next(
                    new ErrorHandler("Please provide the correct information", 400)
                );
            }
            console.log("here reached")
            sendToken(user, 201, res);
            console.log("here reached1")
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

router.get(
    "/getuser",
    isAuthenticated,
    catchAsyncErrors(async (req, res, next) => {
        try {
            // console.log(req.user.id)
            const user = await User.findById(req.user.id);

            if (!user) {
                return next(new ErrorHandler("User doesn't exists", 400));
            }
            // console.log(user)
            res.status(200).json({
                success: true,
                user,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);
router.get("/logout", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        res.status(201).send({
            success: true,
            message: "Log Out Successfull!",
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))

router.put("/update-user-info", upload.none(), isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phoneNumber } = req.body
    const user = await User.findOne({ email }).select("+password");
    console.log(req.body)
    if (!user) {
        return next(new ErrorHandler("Invalid User", 500))
    }
    console.log(user)
    const passwordValid = await user.comparePassword(password)
    if (!passwordValid) {
        return next(new ErrorHandler("Invalid User Credentials", 500))
    }
    user.name = name
    user.email = email
    user.phoneNumber = phoneNumber
    await user.save()
    res.status(201).json({
        success: true,
        user
    })
}))

router.put("/update-user-avatar", isAuthenticated, upload.single("image"), catchAsyncErrors(async (req, res, next) => {
    console.log(req.body)
    try {
        const userExist = await User.findById(req.user.id)
        const pathOfAvatar = `uploads/${userExist.avatar}`
        fs.unlinkSync(pathOfAvatar)
        const newFile = path.join(req.file.filename)
        const user = await User.findByIdAndUpdate(req.user.id, {
            avatar: newFile
        })

        res.status(201).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}))
module.exports = router