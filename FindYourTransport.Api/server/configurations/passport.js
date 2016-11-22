const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user-model");

module.exports = function() {
    passport.use(new LocalStrategy((username, password, done) => {
        // name parameters in site must be username and password
        User.findOne({ username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (!user.isValidPassword(password)) {
                return done(null, false, { message: "Incorrect password." });
            }

            return done(null, user);
        });
    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};