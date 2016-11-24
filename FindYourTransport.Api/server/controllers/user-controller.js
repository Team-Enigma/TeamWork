const data = require("../data")();
const passport = require("passport");

function loadRegisterPage(req, res) {
    res.render("user-views/register");
}

function loadLoginPage(req, res) {
    res.render("user-views/login");
}

function loadUsers(req, res) {
    let users = data.getAllUsers()
        .then((users) => {
            res.render("../views/user-views/all-users", { users: users });
        });
}

function loadUser(req, res) {
    let id = req.params["id"];

    let user = data.getSpecificUser(id)
        .then((user) => {
            console.log("USERAAAAA");
            console.log(user);
            res.render("../views/user-views/user", { user: user });
        });
}

function registerNewUser(req, res) {
    const cashedUser = req.body;

    if (cashedUser.password !== cashedUser.confirmPassword) {
        cashedUser.messages = ["Password does not match"];

        console.log("Bad password");
        res.status(409);
        res.render("user-views/register", cashedUser);
        res.end();
    } else {
        data.registerNewUser(cashedUser)
            .then(() => {
                res.redirect("/login");
                res.end();
            })
            .catch(err => {

                const messages = [];

                if (err.errors) {
                    Object.keys(err.errors).forEach((key) => {
                        const error = err.errors[key];
                        messages.push(error.message);
                    });
                } else if (err.message) {
                    messages.push(err.message);
                }

                cashedUser.messages = messages;

                console.log("problem");
                console.log(err);
                res.status(409);
                res.render("user-views/register", cashedUser);
                res.end();
            });
    }
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
    loadUsers,
    loadUser,
    registerNewUser,
    loginUser,
    logoutUser
};