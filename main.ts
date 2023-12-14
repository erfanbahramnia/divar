const express = require("express");
// configuration of environment variable
require("dotenv").config();
async function main() {
    // create server
    const app = express();

    // listen to server
    const port: string | undefined = process.env.PORT
    if (port) {
        app.listen(port, () => {
            console.log(`server: http://localhost:${port}`);
            
        });
    } else {
        console.log("port of server is undefined please select one!");
    }
};

main();