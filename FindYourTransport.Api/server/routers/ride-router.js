const controllers = require("../controllers");
const queryStringBuilder = require("../utils/query-string-builder");

function checkRequestForQuery(params) {
    for (param in params) {
        if (params[param] !== "") {
            return true;
        }
    }

    return false;
}

function takeRideController(req, res) {
    let reqHasValues = checkRequestForQuery(req.query);

    if (reqHasValues) {
        return controllers.ride.loadFilteredRides(req, res);
    }
    return controllers.ride.loadAllRides(req, res);
}


module.exports = function(app, authenticator, validator) {
    app.get("/rides", takeRideController);
    app.post("/rides", queryStringBuilder.buildAndRedirect);
    app.get("/rides/:id", authenticator.authenticateLoggedUser, controllers.ride.loadSpecificRide);
    app.post("/rides/:id", controllers.ride.removeRideById);

    app.post("/sign-for-ride", authenticator.authenticateLoggedUser, controllers.ride.addPassenger);

    app.get("/calculate-price", authenticator.authenticateLoggedUser, controllers.ride.calculatePrice);

    app.get("/add-ride", authenticator.authenticateLoggedUser, controllers.ride.loadNewRidePage);
    app.post("/add-ride", validator.validateRideCreation, controllers.ride.addNewRide);
};