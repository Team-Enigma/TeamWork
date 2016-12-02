var app = app || {};

$("#tb-search-user").on("click", (ev) => {
    let username = $("#tb-username").val();
    let page = $("#sel-selected-page option:selected").text();
    let size = $("#sel-page-size option:selected").text();

    if(username != "") {
        page = "1";
    }
    
    let params = { username, page, size };

    console.log(params);

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

    console.log(queryString);

    window.location.href = queryString;

});