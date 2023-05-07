const sendToken = (user, statusCode, res) => {
    console.log("eecuted-2")
    const token = user.getJwtToken();
    console.log("eecuted-3")
    // Options for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    };
    console.log("eecuted-4")
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
    console.log("eecuted-5")
};

module.exports = sendToken;