const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const cors = require("cors")
const passport = require("passport")
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
// app.use(fileUpload({ useTempFiles: true }))
app.use("/", express.static("uploads"))
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "backend/config/.env"
    })
}
const user = require("./controller/user");
// const passport = require("passport");
app.use('/api/v2/user', user)
//ErrorHandling
app.use(ErrorHandler)
module.exports = app;