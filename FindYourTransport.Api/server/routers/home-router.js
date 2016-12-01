const express = require("express");

module.exports = function(app, authenticator, validator, controllers) {
    app.get("/", controllers.home.redirectToHomePage);
    app.get("/home", controllers.home.loadHomePage);
};