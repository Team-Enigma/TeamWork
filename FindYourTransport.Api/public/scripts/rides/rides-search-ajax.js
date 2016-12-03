/* globals window $*/

var app = app || {};

function getData() {
    let fromCity = $("#tb-from-city").val();
    let toCity = $("#tb-to-city").val();
    let startDate = $("#tb-start-date").val();
    let endDate = $("#tb-end-date").val();
    let page = $("#sel-selected-page option:selected").text();
    let size = $("#sel-page-size option:selected").text();

    return params = {
        fromCity,
        toCity,
        startDate,
        endDate,
        page,
        size
    };
}

function buildQueryString(params) {
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

    return queryString;
}

function redirectToQueryRoute(queryString) {
    window.location.href = queryString;
}

function handleSubmit() {
    let data = getData();
    let queryString = buildQueryString(data);
    redirectToQueryRoute(queryString);
}

$("#tb-search-ride").on("click", () => {
    handleSubmit()
});
$(window).keypress((ev) => {
    if (ev.which == 13) {
        handleSubmit();
    }
});