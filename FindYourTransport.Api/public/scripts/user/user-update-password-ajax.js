/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-update-password").on("click", () => {
    const oldPassword = $("#tb-password").val();
    const newPassword = $("#tb-new-password").val();
    const newPasswordConfirm = $("#tb-new-password-confirm").val();

    const data = {
        oldPassword,
        newPassword,
        newPasswordConfirm
    };

    if (app.validator.validateUpdatePassword(data)) {
        app.requester.put("/profile/update-password", data)
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