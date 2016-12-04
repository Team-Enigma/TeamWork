/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-update-profile").on("click", () => {
    const firstName = $("#tb-first-name").val();
    const lastName = $("#tb-last-name").val();
    const city = $("#tb-city").val();
    const email = $("#tb-email").val();
    const contact = $("#tb-contact").val();

    const data = {
        firstName,
        lastName,
        city,
        email,
        contact
    };

    if (app.validator.validateUpdateProfile(data)) {
        app.requester.put("/profile/update-info", data)
            .then(response => {
                let parsedResponce = JSON.parse(response);

                if (parsedResponce.success) {
                    app.notificator.showNotification(parsedResponce.success, "success");
                    setTimeout(() => {
                        window.location.href = "/profile";
                    }, 1500);
                } else if (parsedResponce.error) {
                    app.notificator.showNotification(parsedResponce.error, "error");
                }
            })
            .catch(err => {
                let parsedError = JSON.parse(err.responseJSON);
                app.notificator.showNotification(parsedError.error, "error");
            });
    }
});