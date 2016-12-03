var app = app || {};

$("#tb-add-ride").on("click", (ev) => {
    const fromCity = $("#tb-from-city").val();
    const toCity = $("#tb-to-city").val();
    const dateOfTravel = $("#tb-date-of-travel").val();
    const freePlaces = $("#tb-free-seats option:selected").text();
    const price = $("#tb-price").val();
    const contact = $("#tb-contact-info").val();
    const remarks = $("#tb-more-info").val();

    let data = {
        fromCity,
        toCity,
        dateOfTravel,
        freePlaces,
        price,
        contact,
        remarks
    };

    app.requester.post("/rides/add", data)
        .then(response => {
            let parsedResponse = JSON.parse(response);
            if (parsedResponse.success) {
                app.notificator.showNotification(parsedResponse.success, "success");
                setTimeout(() => {
                    window.location.href = "/rides/add";
                }, 1000);
            } else if (parsedResponse.error) {
                app.notificator.showNotification(parsedResponse.error, "error");
            }
        })
        .catch(err => {
            let parsedError = JSON.parse(err.responseJSON);
            app.notificator.showNotification(parsedError.error, "error");
        });
});