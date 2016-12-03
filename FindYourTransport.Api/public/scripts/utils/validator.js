var app = app || {};

(function() {

    function validateMatcher(field, matcher) {
        if (field) {
            if (!field.match(matcher)) {
                return true;
            }
        }

        return false;
    }

    function validateRequired(field) {
        if (field === null || field === "") {
            return true;
        }

        return false;
    }

    function validateEquality(firstField, secondField) {
        if (firstField && secondField) {
            if (firstField !== secondField) {
                return true;
            }

            return false;
        }
    }

    function validateDateIsInTheFuture(date) {
        if (Date.parse(date) <= Date.now()) {
            return true;
        }

        return false;
    }

    function validateRange(number, min, max) {
        if (typeof(number) !== "number") {
            number = parseInt(number);
        }

        if (number < min || number > max) {
            return true;
        }

        return false;
    }

    class Validator {
        validateLogin(data) {
            let isDataValid = true;

            if (validateRequired(data.username)) {
                app.notificator.showNotification(app.constants.user.messages.requiredUsername, "error");
                isDataValid = false;
            }

            if (validateRequired(data.password)) {
                app.notificator.showNotification(app.constants.user.messages.requiredPassword, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.username, app.constants.user.matchers.username)) {
                app.notificator.showNotification(app.constants.user.messages.username, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.password, app.constants.user.matchers.password)) {
                app.notificator.showNotification(app.constants.user.messages.password, "error");
                isDataValid = false;
            }

            return isDataValid;
        }

        validateRegister(data) {
            let isDataValid = true;

            if (validateRequired(data.firstName)) {
                app.notificator.showNotification(app.constants.user.messages.requiredFirstName, "error");
                isDataValid = false;
            }

            if (validateRequired(data.lastName)) {
                app.notificator.showNotification(app.constants.user.messages.requiredLastName, "error");
                isDataValid = false;
            }

            if (validateRequired(data.username)) {
                app.notificator.showNotification(app.constants.user.messages.requiredUsername, "error");
                isDataValid = false;
            }

            if (validateRequired(data.email)) {
                app.notificator.showNotification(app.constants.user.messages.requiredEmail, "error");
                isDataValid = false;
            }

            if (validateRequired(data.password)) {
                app.notificator.showNotification(app.constants.user.messages.requiredPassword, "error");
                isDataValid = false;
            }

            if (validateRequired(data.confirmPassword)) {
                app.notificator.showNotification(app.constants.user.messages.requiredConfirmPassword, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.firstName, app.constants.user.matchers.personName)) {
                app.notificator.showNotification(app.constants.user.messages.personFirstName, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.lastName, app.constants.user.matchers.personName)) {
                app.notificator.showNotification(app.constants.user.messages.personLastName, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.username, app.constants.user.matchers.username)) {
                app.notificator.showNotification(app.constants.user.messages.username, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.email, app.constants.user.matchers.email)) {
                app.notificator.showNotification(app.constants.user.messages.email, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.password, app.constants.user.matchers.password)) {
                app.notificator.showNotification(app.constants.user.messages.password, "error");
                isDataValid = false;
            }

            if (validateEquality(data.password, data.confirmPassword)) {
                app.notificator.showNotification(app.constants.user.messages.confirmPassword, "error");
                isDataValid = false;
            }

            return isDataValid;
        }

        validateMessage(data) {
            let isDataValid = true;

            if (validateRequired(data.name)) {
                app.notificator.showNotification(app.constants.contact.messages.requiredUsername, "error");
                isDataValid = false;
            }

            if (validateRequired(data.address)) {
                app.notificator.showNotification(app.constants.contact.messages.requiredAddress, "error");
                isDataValid = false;
            }

            if (validateRequired(data.title)) {
                app.notificator.showNotification(app.constants.contact.messages.requiredTitle, "error");
                isDataValid = false;
            }

            if (validateRequired(data.content)) {
                app.notificator.showNotification(app.constants.contact.messages.requiredContent, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.name, app.constants.contact.matchers.username)) {
                app.notificator.showNotification(app.constants.contact.messages.username, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.address, app.constants.contact.matchers.address)) {
                app.notificator.showNotification(app.constants.contact.messages.address, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.title, app.constants.contact.matchers.title)) {
                app.notificator.showNotification(app.constants.contact.messages.title, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.content, app.constants.contact.matchers.content)) {
                app.notificator.showNotification(app.constants.contact.messages.content, "error");
                isDataValid = false;
            }

            return isDataValid;
        }

        validateUpdateProfile(data) {
            let isDataValid = true;

            if (validateRequired(data.firstName)) {
                app.notificator.showNotification(app.constants.user.messages.requiredFirstName, "error");
                isDataValid = false;
            }

            if (validateRequired(data.lastName)) {
                app.notificator.showNotification(app.constants.user.messages.requiredLastName, "error");
                isDataValid = false;
            }

            if (validateRequired(data.email)) {
                app.notificator.showNotification(app.constants.user.messages.requiredEmail, "error");
                isDataValid = false;
            }

            if (validateRequired(data.password)) {
                app.notificator.showNotification(app.constants.user.messages.requiredPassword, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.firstName, app.constants.user.matchers.personName)) {
                app.notificator.showNotification(app.constants.user.messages.personFirstName, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.lastName, app.constants.user.matchers.personName)) {
                app.notificator.showNotification(app.constants.user.messages.personLastName, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.email, app.constants.user.matchers.email)) {
                app.notificator.showNotification(app.constants.user.messages.email, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.city, app.constants.user.matchers.city)) {
                app.notificator.showNotification(app.constants.user.messages.city, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.contact, app.constants.user.matchers.contact)) {
                app.notificator.showNotification(app.constants.user.messages.contact, "error");
                isDataValid = false;
            }

            return isDataValid;
        }

        validateRideCreation(data) {
            let isDataValid = true;

            if (validateRequired(data.fromCity)) {
                app.notificator.showNotification(app.constants.ride.messages.requiredStartCity, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.fromCity, app.constants.ride.matchers.city)) {
                app.notificator.showNotification(app.constants.ride.messages.city, "error");
                isDataValid = false;
            }

            if (validateRequired(data.toCity)) {
                app.notificator.showNotification(app.constants.ride.messages.requiredEndCity, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.toCity, app.constants.ride.matchers.city)) {
                app.notificator.showNotification(app.constants.ride.messages.city, "error");
                isDataValid = false;
            }

            if (validateRequired(data.dateOfTravel)) {
                app.notificator.showNotification(app.constants.ride.messages.requiredDate, "error");
                isDataValid = false;
            }

            if (validateDateIsInTheFuture(data.dateOfTravel)) {
                app.notificator.showNotification(app.constants.ride.messages.date, "error");
                isDataValid = false;
            }

            if (validateRequired(data.price)) {
                app.notificator.showNotification(app.constants.ride.messages.requiredPrice, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.price, app.constants.ride.matchers.price)) {
                app.notificator.showNotification(app.constants.ride.messages.priceNumber, "error");
                isDataValid = false;
            }

            if (validateRange(data.price, app.constants.ride.minPrice, app.constants.ride.maxPrice)) {
                app.notificator.showNotification(app.constants.ride.messages.price, "error");
                isDataValid = false;
            }

            if (validateRequired(data.contact)) {
                app.notificator.showNotification(app.constants.ride.messages.requiredContact, "error");
                isDataValid = false;
            }

            return isDataValid;
        }

        validateUpdatePassword(data) {
            let isDataValid = true;

            if (validateRequired(data.oldPassword)) {
                app.notificator.showNotification(app.constants.user.messages.requiredOldPassword, "error");
                isDataValid = false;
            }

            if (validateRequired(data.newPassword)) {
                app.notificator.showNotification(app.constants.user.messages.requiredNewPassword, "error");
                isDataValid = false;
            }

            if (validateRequired(data.newPasswordConfirm)) {
                app.notificator.showNotification(app.constants.user.messages.requiredConfirmPassword, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.oldPassword, app.constants.user.matchers.password)) {
                app.notificator.showNotification(app.constants.user.messages.password, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.newPassword, app.constants.user.matchers.password)) {
                app.notificator.showNotification(app.constants.user.messages.password, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.newPasswordConfirm, app.constants.user.matchers.password)) {
                app.notificator.showNotification(app.constants.user.messages.password, "error");
                isDataValid = false;
            }

            if (validateEquality(data.newPassword, data.newPasswordConfirm)) {
                app.notificator.showNotification(app.constants.user.messages.confirmPassword, "error");
                isDataValid = false;
            }

            return isDataValid;
        }

        validateUpdateCar(data) {
            let isDataValid = true;

            if (validateRequired(data.manufacturer)) {
                app.notificator.showNotification(app.constants.car.messages.requiredManufacturer, "error");
                isDataValid = false;
            }

            if (validateRequired(data.model)) {
                app.notificator.showNotification(app.constants.car.messages.requiredModel, "error");
                isDataValid = false;
            }

            if (validateRequired(data.registrationNumber)) {
                app.notificator.showNotification(app.constants.car.messages.requiredRegistrationNumber, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.manufacturer, app.constants.car.matchers.manufacturer)) {
                app.notificator.showNotification(app.constants.car.messages.manufacturer, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.model, app.constants.car.matchers.model)) {
                app.notificator.showNotification(app.constants.car.messages.model, "error");
                isDataValid = false;
            }

            if (validateMatcher(data.registrationNumber, app.constants.car.matchers.registrationNumber)) {
                app.notificator.showNotification(app.constants.car.messages.registrationNumber, "error");
                isDataValid = false;
            }

            return isDataValid;
        }
    }

    app.validator = new Validator();
}());