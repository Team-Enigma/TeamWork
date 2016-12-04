/* globals document $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-calculate-price").on("click", () => {
    const distance = $("#tb-distance").val()
        .replace(",", ".");
    const consumption = $("#tb-consumption").val()
        .replace(",", ".");
    const fuelType = $("#tb-fuel-type option:selected").text()
        .trim();

    const data = {
        distance,
        consumption,
        fuelType
    };

    if (app.validator.validateCalculator(data)) {
        app.requester.post("/calculate-price", data)
            .then(response => {
                let doc = document.open("text/html", "replace");
                doc.write(response);
                doc.close();
            })
            .catch(err => {
                let parsedError = JSON.parse(err.responseJSON);
                app.notificator.showNotification(parsedError.error, "error");
            });
    }
});