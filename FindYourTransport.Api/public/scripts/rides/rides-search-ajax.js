/* globals window $*/

var app = app || {};

$("#tb-search-ride").on("click", (ev) => {
    let fromCity = $("#tb-from-city").val();
    let toCity = $("#tb-to-city").val();
    let startDate = $("#tb-start-date").val();
    let endDate = $("#tb-end-date").val();
    let page = $("#sel-selected-page option:selected").text();
    let size = $("#sel-page-size option:selected").text();

    let params = {
        fromCity,
        toCity,
        startDate,
        endDate,
        page,
        size
    };

    let queryString = "/rides";

    for (let element in params) {
        if (params[element] !== "" && params[element] !== undefined && params[element] !== null) {
            if (queryString !== "/rides") {
                queryString += "&";
            } else {
                queryString += "?";
            }

            queryString += `${element}=${params[element]}`;
        }
    }

    window.location.href = queryString;
});