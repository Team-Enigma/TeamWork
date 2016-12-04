/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-unsign-from-ride").on("click", () => {
    const rideId = $("#tb-ride-id").val();
    const passengerUsername = $("#tb-ride-passenger").val();

    const data = {
        rideId,
        passengerUsername
    };

    app.requester.put("/rides/:id", data)
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
});