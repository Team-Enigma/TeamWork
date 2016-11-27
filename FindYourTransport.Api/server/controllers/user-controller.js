const data = require("../data")();
const passport = require("passport");

function loadRegisterPage(req, res) {
    res.render("user-views/register");
}

function loadLoginPage(req, res) {
    res.render("user-views/login");
}

function loadProfilePage(req, res) {
    var username = req.user.username;

    data.getUserByUsername(username)
        .then((currentUser) => {
            data.getRidesForUser(currentUser.username)
                .then((rides) => {
                    res.render("user-views/profile", { rides, currentUser });
                });
        })
}

function loadUsersPage(req, res) {
    data.getAllUsers()
        .then((users) => {
            res.render("../views/user-views/all-users", { users });
        });
}

function loadFilteredUsersPage(req, res) {
    data.getFilteredUsers(req.query)
        .then((users) => {
            res.render("../views/user-views/all-users.pug", { users });
        })
        .catch((error) => {
            return error;
        });
}

function loadDetailedUserPage(req, res) {
    let username = req.params.username;

    data.getUserByUsername(username)
        .then((user) => {
            return data.getRidesForUser(username)
                .then((rides) => {
                    return data.getAllRides()
                        .then((rides) => {
                            return {
                                user: user,
                                userRides: rides
                            }
                        });
                });
        })
        .then((result) => {
            res.render("../views/user-views/user", { user: result.user, rides: result.userRides });
        })
        .catch((err) => {
            console.log(err);
        });
}

function registerNewUser(req, res) {
    const cashedUser = req.body;

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

            res.status(409);
            res.render("user-views/register", cashedUser);
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

function uploadAvatar(req, res) {
    const user = req.user;
    const filename = req.file.filename;
    data.getUserByUsername(user.username)
        .then((user) => {
            return user;
        })
        .then((user) => {
            data.updateUserAvatar(user, filename);
        })
        .then(() => {
            res.redirect("/profile");
        })
        .catch((err) => {
            console.log(err);
        });
}

function updateInfo(req, res) {
    var user = req.user;

    data.getUserByUsername(user.username)
        .then((user) => {
            return user;
        })
        .then((user) => {
            data.updateUserInfo(user, req.body);
        })
        .then(() => {
            res.redirect("/profile");
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = {
    loadRegisterPage,
    loadLoginPage,
    loadProfilePage,
    loadUsersPage,
    loadDetailedUserPage,
    loadFilteredUsersPage,
    registerNewUser,
    loginUser,
    logoutUser,
    uploadAvatar,
    updateInfo
};