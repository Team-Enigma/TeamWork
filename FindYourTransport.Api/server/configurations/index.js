"use strict";

const path = require("path");

const rootPath = path.join(__dirname, "/../../");

module.exports = {
    db: "mongodb://localhost/FindYourTransportDb",
    port: 8080,
    rootPath
};