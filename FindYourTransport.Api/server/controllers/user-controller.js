module.exports = (data, passport, constants) => {

    function loadRegisterPage(req, res) {
        res.render("user-views/register");
    }

    function loadLoginPage(req, res) {
        res.render("user-views/login");
    }

    function loadProfilePage(req, res) {
        const currentUser = req.user;

        data.getRidesForUser(currentUser.username)
            .then((rides) => {
                res.render("user-views/profile", { rides: rides, fuelTypes: constants.car.enums.fuelTypes, transmissionTypes: constants.car.enums.transmissionTypes });
            });
    }

    function loadUsersPage(req, res) {
        let pageSize = parseInt(req.query.size) || 10,
            currentPage = parseInt(req.query.page) || 1,
            pagesCount,
            allUsersLength;

        data.getAllUsers()
            .then((users) => {
                pagesCount = Math.ceil(users.length / pageSize);

                allUsersLength = users.length;

                if (allUsersLength % 8 !== 0) {
                    allUsersLength += 8 - allUsersLength % 8;
                }

                console.log(allUsersLength);

                let end = pageSize * (currentPage - 1) + pageSize;

                if (end > users.length) {
                    end = users.length;
                }

                return users.slice(pageSize * (currentPage - 1), end);
            })
            .then((pagedUsers) => {
                res.render("../views/user-views/all-users", { users: pagedUsers, pageSize, currentPage, pagesCount, length: allUsersLength });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function loadFilteredUsersPage(req, res) {
        let pageSize = parseInt(req.query.size) || 8,
            currentPage = parseInt(req.query.page) || 1,
            pagesCount,
            allUsersLength;

        data.getFilteredUsers(req.query)
            .then((users) => {
                pagesCount = Math.ceil(users.length / pageSize);

                allUsersLength = users.length;

                if (allUsersLength % 8 !== 0) {
                    allUsersLength += 8 - allUsersLength % 8;
                }

                let end = pageSize * (currentPage - 1) + pageSize;

                if (end > users.length) {
                    end = users.length;
                }

                return users.slice(pageSize * (currentPage - 1), end);
            })
            .then((pagedUsers) => {
                res.render("../views/user-views/all-users.pug", { users: pagedUsers, pageSize, currentPage, pagesCount, length: allUsersLength });
            })
            .catch((error) => {
                return error;
            });
    }

    function loadDetailedUserPage(req, res) {
        const username = req.params.username;
        let foundUser;
        data.getUserByUsername(username)
            .then((user) => {
                foundUser = user;
            })
            .then(() => {
                return data.getRidesForUser(username);
            })
            .then((rides) => {
                return {
                    user: foundUser,
                    userRides: rides
                };
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
        passport.authenticate("local", (err, user) => {
            if (err) {
                // server error from passport.authenticate
                return next(err);
            }
            if (user) {
                req.login(user, (err2) => {
                    if (err2) {
                        // server error from passport.login
                        return res.json("{\"error\": \"Invalid username or password.\"}");
                    }
                    return res.json(`{\"success\": \"Successful login. Welcome ${user.username}\"}`);
                });
            } else {
                return res.json("{\"error\": \"Invalid username or password.\"}");
            }

        })(req, res, next);
    }

    function logoutUser(req, res) {
        req.logout();
        res.redirect("/");
    }

    function uploadAvatar(req, res) {
        const currentUser = req.user;
        const filename = req.file.filename;
        data.getUserByUsername(currentUser.username)
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
        let currentUser = req.user;

        data.getUserByUsername(currentUser.username)
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

    function updatePassword(req, res) {
        let currentUser = req.user;
        let newPassword = req.body.newPassword;

        data.getUserByUsername(currentUser.username)
            .then((user) => {
                data.changeUserPassword(user, newPassword);
            })
            .then(() => {
                res.redirect("/profile");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function updateCarInfo(req, res) {
        let currentUser = req.user;
        let car = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            seats: req.body.seats,
            fuel: req.body.fuelType,
            transmission: req.body.transmissionType,
            registrationNumber: req.body.registrationNumber
        };

        data.getUserByUsername(currentUser.username)
            .then((user) => {
                data.updateUserCarInfo(user, car);
            })
            .then(() => {
                res.redirect("/profile");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return {
        name: "user",
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
        updateInfo,
        updatePassword,
        updateCarInfo
    };
};