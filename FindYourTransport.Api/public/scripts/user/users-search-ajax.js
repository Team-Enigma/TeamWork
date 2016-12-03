var app = app || {};

$("#tb-search-user").on("click", (ev) => {
    let username = $("#tb-username").val();
    let page = $("#sel-selected-page option:selected").text();
    let size = $("#sel-page-size option:selected").text();

    let params = { username, page, size };

    let queryString = "/users";

    for (let element in params) {
        if (params[element] !== "") {
            if (queryString !== "/users") {
                queryString += "&";
            } else {
                queryString += "?";
            }

            queryString += `${element}=${params[element]}`;
        }
    }

    window.location.href = queryString;

});