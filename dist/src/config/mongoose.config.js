"use strict";
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("mongodb is connected...");
}).catch((error) => {
    console.log((error === null || error === void 0 ? void 0 : error.message) && "mongoose connection failed!");
});
