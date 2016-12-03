/* globals window $*/

var app = app || {};

$("#tb-unsign-from-ride").on("click", (ev) => {
    const rideId = $("#tb-ride-id").val();
    const passengerUsername = $("#tb-ride-passenger").val();

    let data = {
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