const mongoose = require("mongoose");
require("dotenv").config()

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("mongodb is connected...")
}).catch((error: any) => {
    console.log(error?.message && "mongoose connection failed!")
})