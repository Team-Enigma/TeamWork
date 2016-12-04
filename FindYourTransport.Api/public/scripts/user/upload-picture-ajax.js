/* globals window FormData $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-upload-image").on("click", () => {
    const picture = $("#tb-avatar")[0].files[0];

    let data = new FormData();
    data.append("picture", picture);

    app.requester.postFile("/profile/upload-avatar", data)
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
});