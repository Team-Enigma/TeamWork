const constants = require("./constants");

function validateRequired(field, requiredMessage, messages) {
    if (!field) {
        messages.push(requiredMessage);
    }
}

function validateMatcher(field, matcher, matchingMessage, messages) {
    if (field) {
        if (!field.match(matcher)) {
            messages.push(matchingMessage);
        }
    }
}

function validateEquality(firstField, secondField, matchingMessage, messages) {
    if (firstField && secondField) {
        if (firstField !== secondField) {
            messages.push(matchingMessage);
        }
    }
}

function validateDate(field, matchedMessage, messages) {
    if (field) {
        const date = new Date(field);
        if (date.getTime() < Date.now()) {
            messages.push(matchedMessage);
        }
    }
}

function validateNumberRange(field, lowerBoundary, higherBoundary, matchMessage, messages) {
    if (field) {
        if (field < lowerBoundary && field > higherBoundary) {
            messages.push(matchMessage);
        }
    }
}

function validateUserLogin(req, res, next) {
    const cashedUser = req.body;
    const messages = [];

    validateRequired(cashedUser.username,
        constants.user.messages.requiredUsername,
        messages);

    validateRequired(cashedUser.password,
        constants.user.messages.requiredPassword,
        messages);

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

    fields.forEach(f => {
        validateRequired(f.field, f.requiredMessage, messages);
        validateMatcher(f.field, f.matcher, f.matchingMessage, messages);
    });

    validateEquality(
        cashedUser.password,
        cashedUser.confirmPassword,
        constants.user.messages.confirmPassword,
        messages);

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
            matcher: constants.ride.matchers.city,
            matchMessage: constants.ride.messages.city,
            requiredMessage: constants.ride.messages.requiredStartCity
        },
        toCity: {
            field: cashedRide.toCity,
            matcher: constants.ride.matchers.city,
            matchMessage: constants.ride.messages.city,
            requiredMessage: constants.ride.messages.requiredStartCity
        },
        dateOfTravel: {
            field: cashedRide.dateOfTravel,
            requiredMessage: constants.ride.messages.requiredDate
        },
        price: {
            field: cashedRide.price,
            matcher: constants.ride.matchers.price,
            matchMessage: constants.ride.messages.priceNumber,
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
        validateRequired(f.field, f.requiredMessage, messages);
        if (f.matcher) {
            validateMatcher(f.field, f.matcher, f.matchMessage, messages);
        }
    });

    validateDate(cashedRide.dateOfTravel,
        constants.ride.messages.date,
        messages);

    validateNumberRange(cashedRide.price, 0, 1000, constants.ride.messages.price, messages);

    if (messages.length > 0) {
        cashedRide.messages = messages;
        res.status(409);
        res.render("ride-views/add-new-ride", cashedRide);
        res.end();
    } else {
        next();
    }
}

function validatePasswordChange(req, res, next) {
    let cashedUser = req.user;
    let formData = req.body;
    let messages = [];

    const changePasswordFormFields = {
        oldPassword: {
            field: formData.oldPassword,
            matcher: constants.user.matchers.password,
            matchMessage: constants.user.messages.password,
            requiredMessage: constants.user.messages.requiredPassword
        },
        newPassword: {
            field: formData.newPassword,
            matcher: constants.user.matchers.password,
            matchMessage: constants.user.messages.password,
            requiredMessage: constants.user.messages.requiredPassword
        },
        confirmPassword: {
            field: formData.newPasswordConfirm,
            matcher: constants.user.matchers.password,
            matchMessage: constants.user.messages.password,
            requiredMessage: constants.user.messages.requiredConfirmPassword
        }
    };

    const fields = Object.keys(changePasswordFormFields).map(key => {
        return changePasswordFormFields[key];
    });

    fields.forEach(f => {
        validateRequired(f.field, f.requiredMessage, messages);
        validateMatcher(f.field, f.matcher, f.matchingMessage, messages);
    });

    validateEquality(
        formData.newPassword,
        formData.newPasswordConfirm,
        constants.user.messages.confirmPassword,
        messages);

    if (messages.length > 0) {
        cashedUser.messages = messages;
        res.status(409);
        res.render("user-views/profile", cashedUser);
        res.end();
    } else {
        next();
    }
}

function validateCarCreation(req, res, next) {
    let cachedCar = req.body;
    const messages = [];

    const carFormFields = {
        manufacturer: {
            field: cachedCar.manufacturer,
            matcher: constants.car.matchers.manufacturer,
            matchMessage: constants.car.messages.manufacturer,
            requiredMessage: constants.car.messages.requiredManufacturer
        },
        model: {
            field: cachedCar.model,
            matcher: constants.car.matchers.model,
            matchMessage: constants.car.messages.model,
            requiredMessage: constants.car.messages.requiredModel
        },
        registrationNumber: {
            field: cachedCar.registrationNumber,
            matcher: constants.car.matchers.registrationNumber,
            matchMessage: constants.car.messages.registrationNumber,
            requiredMessage: constants.car.messages.requiredRegistrationNumber
        }
    };

    const fields = Object.keys(carFormFields).map(key => {
        return carFormFields[key];
    });

    fields.forEach(f => {
        validateRequired(f.field, f.requiredMessage, messages);
        if (f.matcher) {
            validateMatcher(f.field, f.matcher, f.matchMessage, messages);
        }
    });

    if (messages.length > 0) {
        cachedCar.messages = messages;
        res.status(409);
        res.redirect("back");
        // messed up a little bit with the rendering
        res.end();
    } else {
        next();
    }
}

module.exports = {
    validateUserLogin,
    validateUserRegistration,
    validateRideCreation,
    validateCarCreation,
    validatePasswordChange
};