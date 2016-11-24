"use strict";

const path = require("path");
const root = path.join(__dirname, "/../../");

const fav = require("serve-favicon");
const favicon = fav(path.join(__dirname, "../../public/images/Cemagraphics-Classic-Cars-Vw-beetle.ico"));


module.exports = {
    db: "mongodb://localhost/FindYourTransportDb",
    port: 8080,
    root,
    favicon
};