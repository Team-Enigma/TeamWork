function buildAndRedirect(req, res) {
    var queryString = req.path;

    var params = req.body;

    for (element in params) {
        if (params[element] !== '') {
            if (queryString !== req.path) {
                queryString += '&';
            } else {
                queryString += '?';
            }

            queryString += `${element}=${params[element]}`;
        }
    }

    res.redirect(queryString);
}

module.exports = {
    buildAndRedirect
}