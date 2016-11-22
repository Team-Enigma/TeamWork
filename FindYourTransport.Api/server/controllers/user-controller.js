const data = require("../data")();
const passport = require("passport");

function loadRegisterPage(req, res) {
    res.render("user-views/register");
}

function loadLoginPage(req, res) {
    res.render("user-views/login");
}

function registerNewUser(req, res) {
    const body = req.body;

    data.registerNewUser(body)
        .then(() => {
            res.redirect("/login");
        })
        .catch(err => {

            const errors = [];

            if (err.errors) {
                Object.keys(err.errors).forEach((key) => {
                    const error = err.errors[key];
                    errors.push(error.message);
                });
            } else if (err.message) {
                errors.push(err.message);
            }

            res.status(409);
            res.render("user-views/register", { messages: errors });
            res.end();
        });
}

function loginUser(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            // server error from passport.authenticate
            return next(err);
        }
        if (user) {
            req.login(user, (err2) => {
                if (err2) {
                    // server error from passport.login
                    return next(err);
                }
                return res.redirect("/");
            });
        } else {
            return res.render("user-views/login", { messages: info });
        }

    })(req, res, next);
}

function logoutUser(req, res) {
    req.logout();
    res.redirect("/");
}

module.exports = {
    loadRegisterPage,
    loadLoginPage,
    registerNewUser,
    loginUser,
    logoutUser
};