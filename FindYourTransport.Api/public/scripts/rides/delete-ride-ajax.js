var app = app || {};

$(".delete-ride").on("click", (ev) => {
    const rideId = $(ev.target)
        .parent()
        .prev()
        .val();

    let data = { rideId };

    app.requester.delete(`/rides/${rideId}`, data)
        .then(response => {
            let parsedResponse = JSON.parse(response);
            if (parsedResponse.success) {
                app.notificator.showNotification(parsedResponse.success, "success");
                setTimeout(() => {
                    window.location.href = "/profile";
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