const express = require("express");
const controllers = require("../controllers");

module.exports = function(app, authenticator, validator) {
    app.get("/", controllers.home.redirectToHomePage);
    app.get("/home", controllers.home.loadHomePage);
};