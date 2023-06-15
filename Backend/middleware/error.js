const ErrorHandler = require("../utils/errroHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongo db ID Entry
    if (err.name === "CastError") {
        const message = `Resources not found with this id.. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
        return next(err);
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
        return next(err);
    }

    // wrong JWT Token
    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid please try again later`;
        err = new ErrorHandler(message, 400);
        return next(err);
    }

    // jwt expired
    if (err.name === "TokenExpiredError") {
        const message = `Your Token is expired please try again later`;
        err = new ErrorHandler(message, 400);
        return next(err);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
