const app = require("./app")
const db = require("./db/Database")

process.on("uncaughtException", (err) => {
    console.log("Error:", err.message);
})

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env"
    })
}
db()
const server = app.listen(process.env.PORT, () => {
    console.log(
        `Server is running on http://localhost:${process.env.PORT}`
    );
});

process.on("unhandledRejection", (err) => {
    console.log("Error:", err.message)
})