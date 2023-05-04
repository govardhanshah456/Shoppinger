const mongoose = require("mongoose")
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Connected to Database."))
        .catch((err) => console.log("failed:", err.message))
}
module.exports = connectDB