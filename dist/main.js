"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
// configuration of environment variable
require("dotenv").config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // create server
        const app = express();
        // listen to server
        const port = process.env.PORT;
        if (port) {
            app.listen(port, () => {
                console.log(`server: http://localhost:${port}`);
            });
        }
        else {
            console.log("port of server is undefined please select one!");
        }
    });
}
;
main();
