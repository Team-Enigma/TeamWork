const express = require("express");
const controllers = require("../controllers");

module.exports = function(app) {
    app.get("/", controllers.home.redirectToHome);
    app.get("/home", controllers.home.loadHomePage);
}