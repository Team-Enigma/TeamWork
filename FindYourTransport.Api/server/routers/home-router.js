const express = require("express");
const controllers = require("../controllers");

module.exports = function(app) {
    app.get("/", controllers.views.redirectToHome);
    app.get("/home", controllers.views.getHomePageView);
}