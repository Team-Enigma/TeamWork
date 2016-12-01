"use strict";

const path = require("path");
const root = path.join(__dirname, "/../../");

const fav = require("serve-favicon");
const favicon = fav(path.join(__dirname, "../../public/images/favicon.ico"));


module.exports = {
    db: "mongodb://localhost/FindYourTransportDb",
    port: process.env.PORT || 8080,
    root,
    favicon
};