/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

function getData() {
    let username = $("#tb-username").val();
    let page = $("#sel-selected-page option:selected").text();
    let size = $("#sel-page-size option:selected").text();

    const data = {
        username,
        page,
        size
    };

    return data;
}

function buildQueryString(params) {
    let queryString = "/users";

    for (let element in params) {
        if (params[element] !== "") {
            if (queryString === "/users") {
                queryString += "?";
            } else {
                queryString += "&";
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

$("#tb-search-user").on("click", () => {
    handleSubmit();
});

$(window).keypress((ev) => {
    if (ev.which === 13) {
        handleSubmit();
    }
});