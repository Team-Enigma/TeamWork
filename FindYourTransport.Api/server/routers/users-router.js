const express = require("express");
const controllers = require("../controllers");

module.exports = function (app) {
    app.get("/register", controllers.user.loadRegisterPage);

    app.post("/register", controllers.user.registerNewUser);
};