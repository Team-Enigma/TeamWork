const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");

module.exports = function(app, config) {
    app.set("view engine", "pug");
    app.set("views", path.join(config.root, "server/views/"));

    app.use(express.static(path.join(config.root, "public")));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        secret: "42noissesterces",
        resave: true,
        saveUninitialized: true
    }));
};