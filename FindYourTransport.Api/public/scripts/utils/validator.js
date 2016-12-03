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

            if (validateRequired(data.password)) {
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
    }

    app.validator = new Validator();
}());