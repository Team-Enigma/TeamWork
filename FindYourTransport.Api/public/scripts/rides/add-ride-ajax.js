/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

function getData() {
    const fromCity = $("#tb-from-city").val();
    const toCity = $("#tb-to-city").val();
    const dateOfTravel = $("#tb-date-of-travel").val();
    const freePlaces = $("#tb-free-seats option:selected").text();
    const price = $("#tb-price").val();
    const contact = $("#tb-contact-info").val();
    const remarks = $("#tb-more-info").val();

    const data = {
        fromCity,
        toCity,
        dateOfTravel,
        freePlaces,
        price,
        contact,
        remarks
    };

    return data;
}

function handleSubmit() {
    let data = getData();

    if (app.validator.validateRideCreation(data)) {
        app.requester.post("/rides/add", data)
            .then(response => {
                let parsedResponse = JSON.parse(response);
                if (parsedResponse.success) {
                    app.notificator.showNotification(parsedResponse.success, "success");
                    setTimeout(() => {
                        window.location.href = "/rides/add";
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
}

$("#tb-add-ride").on("click", () => {
    handleSubmit();
});

$(window).keypress((ev) => {
    if (ev.which === 13) {
        handleSubmit();
    }
});