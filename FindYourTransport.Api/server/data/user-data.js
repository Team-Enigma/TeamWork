const encryption = require("../utils/encryption");

module.exports = (models) => {
    let { User } = models;

    function createNewUser(body) {
        return new Promise((resolve, reject) => {
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, body.password);

            User.create({
                    username: body.username,
                    hashedPassword,
                    salt,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    city: body.city,
                    email: body.email
                })
                .then(() => {
                    return resolve();
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    function registerNewUser(body) {
        return new Promise((resolve, reject) => {
            User.findOne({
                    $or: [
                        { username: body.username },
                        { email: body.email }
                    ]
                })
                .then(user => {
                    if (user) {
                        throw new Error("A user with this username or email already exists");
                    }
                })
                .then(() => {
                    return createNewUser(body);
                })
                .then(() => {
                    return resolve();
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    // function getAllUsers() {
    //     return new Promise((resolve, reject) => {
    //         User.find((err, users) => {
    //             if (err) {
    //                 return reject(err);
    //             }

    //             return resolve(users || null);
    //         });
    //     });
    // }

    function getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            User.findOne({ username }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user || null);
            });
        });
    }

    function getFilteredUsers(filter) {
        let filteredUsers = User.find();

        console.log(filter);
        console.log(filter.username);
        if (filter.username !== undefined && filter.username !== "") {
            filteredUsers.where({ username: new RegExp(filter.username, "i") });
        }

        return filteredUsers.sort("username").exec((err, users) => {
            if (err) {
                return err;
            }
            return users;
        });
    }

    function updateUserAvatar(user, filename) {
        User.update({ _id: user._id }, { avatar: filename }, null, (err) => {
            if (err) {
                return err;
            }

            return;
        });
    }

    function updateUserInfo(user, params) {
        const changes = {};

        for (param in params) {
            if (params[param] !== user[param]) {
                changes[param] = params[param];
            }
        }

        User.update({ _id: user._id }, changes, null, (err) => {
            if (err) {
                return err;
            }

            return;
        });
    }

    function changeUserPassword(user, requestPassword) {
        const hashedNewPassword = encryption.generateHashedPassword(user.salt, requestPassword);
        let newPassword = { hashedPassword: hashedNewPassword };

        User.update({ _id: user._id }, newPassword, null, (err) => {
            if (err) {
                return err;
            }

            return;
        });
    }

    function updateUserCarInfo(user, carInfo) {
        User.update({ _id: user._id }, { car: carInfo }, null, (err) => {
            if (err) {
                return err;
            }

            return;
        });
    }

    return {
        registerNewUser,
        //getAllUsers,
        getUserByUsername,
        getFilteredUsers,
        updateUserAvatar,
        updateUserInfo,
        updateUserCarInfo,
        changeUserPassword
    };
};