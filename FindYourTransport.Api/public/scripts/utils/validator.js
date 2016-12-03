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
            return isDataValid;
        }
    }

    app.validator = new Validator();
}());