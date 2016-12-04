/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-send-comment").on("click", () => {
    const rideId = $("#tb-comment-ride-id").val();
    const comment = $("#tb-ride-comment").val();
    console.log(rideId);
    const data = {
        rideId,
        comment
    };

    if (app.validator.validateComment(data)) {
        app.requester.post("/rides/comment", data)
            .then(response => {
                let parsedResponse = JSON.parse(response);
                if (parsedResponse.success) {
                    app.notificator.showNotification(parsedResponse.success, "success");
                    setTimeout(() => {
                        window.location.href = `/rides/${rideId}`;
                    }, 1500);
                } else if (parsedResponse.error) {
                    app.notificator.showNotification(parsedResponse.error, "error");
                }
            })
            .catch(err => {
                let parsedError = JSON.parse(err.responseJSON);
                app.notificator.showNotification(parsedError.error, "error");
            });
    }

});