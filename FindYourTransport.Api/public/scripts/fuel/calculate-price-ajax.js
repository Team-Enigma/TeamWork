/* globals document $*/
var app = app || {};

$("#tb-calculate-price").on("click", (ev) => {
    const distance = $("#tb-distance").val().replace(",", ".");
    const consumption = $("#tb-consumption").val().replace(",", ".");
    const fuelType = $("#tb-fuel-type option:selected").text().trim();


    let data = {
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