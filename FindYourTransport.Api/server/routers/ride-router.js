const controllers = require("../controllers");
const queryStringBuilder = require("../utils/query-string-builder");

function takeRideController(req, res) {
    var reqHasValues = checkRequestForQuery(req.query);

    if (reqHasValues) {
        return controllers.ride.loadFilteredRides(req, res);
    } else {
        return controllers.ride.loadAllRides(req, res);
    }
}

function checkRequestForQuery(params) {
    for (param in params) {
        if (params[param] !== '') {
            return true;
        }
    }

    return false;
}

module.exports = function(app, authenticator, validator) {
    app.get("/rides", takeRideController);
    app.post("/rides", queryStringBuilder.buildAndRedirect);
    app.get("/rides/:id", controllers.ride.loadSpecificRide);
    app.post("/rides/:id", controllers.ride.removeRideById);

    app.post("/sign-for-ride", authenticator.authenticateLoggedUser, controllers.ride.addPassenger, controllers.user.loadUserByUserName);

    app.get("/calculate-price", authenticator.authenticateLoggedUser, controllers.ride.calculatePrice);

    app.get("/add-ride", authenticator.authenticateLoggedUser, controllers.ride.loadNewRidePage);
    app.post("/add-ride", validator.validateRideCreation, controllers.ride.addNewRide);
};