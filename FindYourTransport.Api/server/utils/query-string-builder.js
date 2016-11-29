function buildAndRedirect(req, res) {
    let queryString = req.path;

    let params = req.body;

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