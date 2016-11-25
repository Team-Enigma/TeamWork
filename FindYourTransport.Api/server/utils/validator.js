const constants = require("./constants");

function validateUserLogin(req, res, next) {
    const cashedUser = req.body;
    const messages = [];

    if (!cashedUser.username) {
        messages.push(constants.user.messages.requiredUsername);
    }

    if (!cashedUser.password) {
        messages.push(constants.user.messages.requiredPassword);
    }

    if (messages.length > 0) {
        cashedUser.messages = messages;
        res.status(409);
        res.render("user-views/login", cashedUser);
        res.end();
    } else {
        next();
    }
}

function validateUserRegistration(req, res, next) {
    const cashedUser = req.body;
    const messages = [];

    const registrationFormFields = {
        username: {
            field: cashedUser.username,
            matcher: constants.user.matchers.username,
            matchMessage: constants.user.messages.username,
            requiredMessage: constants.user.messages.requiredUsername
        },
        firstName: {
            field: cashedUser.firstName,
            matcher: constants.user.matchers.personName,
            matchMessage: constants.user.messages.personFirstName,
            requiredMessage: constants.user.messages.requiredFirstName
        },
        lastName: {
            field: cashedUser.lastName,
            matcher: constants.user.matchers.personName,
            matchMessage: constants.user.messages.personLastName,
            requiredMessage: constants.user.messages.requiredLastName
        },
        email: {
            field: cashedUser.email,
            matcher: constants.user.matchers.email,
            matchMessage: constants.user.messages.email,
            requiredMessage: constants.user.messages.requiredEmail
        },
        password: {
            field: cashedUser.password,
            matcher: constants.user.matchers.password,
            matchMessage: constants.user.messages.password,
            requiredMessage: constants.user.messages.requiredPassword
        },
        confirmPassword: {
            field: cashedUser.confirmPassword,
            matcher: constants.user.matchers.password,
            matchMessage: constants.user.messages.password,
            requiredMessage: constants.user.messages.requiredConfirmPassword
        }
    };

    const fields = Object.keys(registrationFormFields).map(key => {
        return registrationFormFields[key];
    });

    if (cashedUser.confirmPassword && cashedUser.password) {
        if (cashedUser.password !== cashedUser.confirmPassword) {
            messages.push(constants.user.messages.confirmPassword);
        }
    }

    fields.forEach(f => {
        if (f.field) {
            if (!f.field.match(f.matcher)) {
                messages.push(f.matchMessage);
            }
        } else {
            messages.push(f.requiredMessage);
        }
    });

    if (messages.length > 0) {
        cashedUser.messages = messages;
        res.status(409);
        res.render("user-views/register", cashedUser);
        res.end();
    } else {
        next();
    }
}

function validateRideCreation(req, res, next) {
    const cashedRide = req.body;
    const messages = [];

    const rideFormFields = {
        fromCity: {
            field: cashedRide.fromCity,
            requiredMessage: constants.ride.messages.requiredStartCity
        },
        toCity: {
            field: cashedRide.toCity,
            requiredMessage: constants.ride.messages.requiredStartCity
        },
        dateOfTravel: {
            field: cashedRide.dateOfTravel,
            requiredMessage: constants.ride.messages.requiredDate
        },
        price: {
            field: cashedRide.price,
            requiredMessage: constants.ride.messages.requiredPrice
        },
        contact: {
            field: cashedRide.contact,
            requiredMessage: constants.ride.messages.requiredContact
        }
    };

    const fields = Object.keys(rideFormFields).map(key => {
        return rideFormFields[key];
    });

    fields.forEach(f => {
        if (!f.field) {
            messages.push(f.requiredMessage);
        }
    });

    if (cashedRide.fromCity) {
        if (cashedRide.fromCity.match(constants.ride.matchers.city)) {
            messages.push(constants.ride.messages.city);
        }
    }

    if (cashedRide.toCity) {
        if (cashedRide.toCity.match(constants.ride.matchers.city)) {
            messages.push(constants.ride.messages.city);
        }
    }

    if (cashedRide.dateOfTravel) {
        const date = new Date(cashedRide.dateOfTravel);
        if (date.getTime() < Date.now()) {
            messages.push(constants.ride.messages.date);
        }
    }

    if (cashedRide.price) {
        if (!cashedRide.price.match(constants.ride.matchers.price)) {
            messages.push(constants.ride.messages.priceNumber);
        }

        if (cashedRide.price < 0 && cashedRide > 1000) {
            messages.push(constants.ride.messages.price);
        }
    }

    if (messages.length > 0) {
        cashedRide.messages = messages;
        res.status(409);
        res.render("ride-views/add-new-ride", cashedRide);
        res.end();
    } else {
        next();
    }
}

module.exports = {
    validateUserLogin,
    validateUserRegistration,
    validateRideCreation
};