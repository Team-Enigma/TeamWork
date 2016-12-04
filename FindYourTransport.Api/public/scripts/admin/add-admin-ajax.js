/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-add-admin").on("click", () => {
    const username = $("#tb-username").val();

    const data = { username };

    app.requester.put("/admin", data)
        .then(response => {
            let parsedResponse = JSON.parse(response);

            if (parsedResponse.success) {
                app.notificator.showNotification(parsedResponse.success, "success");
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1500);
            } else if (parsedResponse.error) {
                app.notificator.showNotification(parsedResponse.error, "error");
            }
        })
        .catch(err => {
            let parsedError = JSON.parse(err.responseJSON);
            app.notificator.showNotification(parsedError.error, "error");
        });
});