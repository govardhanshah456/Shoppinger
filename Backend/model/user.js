const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name!"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email!"],
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    isGoogleUser: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: function () {
            return !this.isGoogleUser;
        },
        minLength: [4, "Password Should Be Greater Than 4 Characters."],
        select: false,
    },
    phoneNumber: {
        type: Number,
    },
    addresses: [{
        country: {
            type: String,
        },
        city: {
            type: String,
        },
        address1: {
            type: String,
        },
        address2: {
            type: String,
        },
        zipCode: {
            type: Number,
        },
        addressType: {
            type: String,
        }
    }],
    role: {
        type: String,
    },
    avatar: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);