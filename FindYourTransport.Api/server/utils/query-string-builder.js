function buildAndRedirect(req, res) {
    let queryString = req.path;

    let params = req.body;

    for (let element in params) {
        if (params[element] !== "") {
            if (queryString !== req.path) {
                queryString += "&";
            } else {
                queryString += "?";
            }

            queryString += `${element}=${params[element]}`;
        }
    }

    res.redirect(queryString);
}

function checkRequestForQuery(params) {
    for (let param in params) {
        if (params[param] !== "" && param !== "page" && param !== "size") {
            return true;
        }
    }

    return false;
}

module.exports = {
    buildAndRedirect,
    checkRequestForQuery
};