/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-update-message").on("click", () => {
    const messageId = $("#tb-hidden-message-id").val();
    const option = $("#tb-message-status option:selected").text();

    const data = {
        messageId,
        option
    };

    app.requester.put("/admin/messages", data)
        .then(response => {
            let parsedResponse = JSON.parse(response);
            if (parsedResponse.success) {
                app.notificator.showNotification(parsedResponse.success, "success");
                setTimeout(() => {
                    window.location.href = `/admin/messages/${messageId}`;
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