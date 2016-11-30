const express = require("express");
const controllers = require("../controllers");

module.exports = function(app, authenticator, validator) {
    app.get("/contact", controllers.contact.loadContactPage);
    app.post("/send-message", controllers.contact.sendMessage);
};