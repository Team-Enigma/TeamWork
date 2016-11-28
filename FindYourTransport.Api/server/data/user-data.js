const User = require("../models/user-model");
const encryption = require("../utils/encryption");

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

function getAllUsers() {
    return User.find((err, users) => {
        if (err) {
            return err;
        }
        return users;
    });
}

function getUserByUsername(username) {
    return User.findOne({ username }, (err, user) => {
        if (err) {
            return err;
        }

        return user;
    });
}

function getFilteredUsers(filter) {
    let filteredUsers = User.find();

    if (filter.username !== undefined && filter.username !== "") {
        filteredUsers.where("username").eq(filter.username);
    }

    return filteredUsers.exec((err, users) => {
        if (err) {
            return err;
        }
        return users;
    });
}

function updateUserAvatar(user, filename) {
    console.log(filename);
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

module.exports = {
    registerNewUser,
    getAllUsers,
    getUserByUsername,
    getFilteredUsers,
    updateUserAvatar,
    updateUserInfo
};