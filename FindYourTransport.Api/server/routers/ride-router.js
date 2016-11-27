const controllers = require("../controllers");
const queryStringBuilder = require("../utils/query-string-builder");

function takeRideController(req, res) {
    var reqHasValues = checkRequestForQuery(req, res);

    if (reqHasValues) {
        controllers.ride.loadFilteredRides(req, res);
    } else {
        controllers.ride.loadAllRides(req, res);
    }
}

function checkRequestForQuery(req, res) {
    for (param in req.query) {
        if (req.query[param] !== '') {
            return true;
        }
    }

    return false;
}

module.exports = function(app, authenticator, validator) {
    app.get("/rides", takeRideController);
    app.get("/rides/:id", authenticator.authenticateLoggedUser, controllers.ride.loadSpecificRide);
    app.post("/rides", queryStringBuilder.buildAndRedirect);

    app.post("/sign-for-ride", controllers.ride.addPassenger);

    app.get("/calculate-price", authenticator.authenticateLoggedUser, controllers.ride.calculatePrice);

    app.get("/add-ride", authenticator.authenticateLoggedUser, controllers.ride.loadNewRidePage);
    app.post("/add-ride", validator.validateRideCreation, controllers.ride.addNewRide);
};