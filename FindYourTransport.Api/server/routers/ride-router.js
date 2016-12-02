const queryStringBuilder = require("../utils/query-string-builder");

module.exports = function(app, authenticator, validator, controllers) {
    app.get("/rides", controllers.ride.loadFilteredRides);
    app.get("/rides/:id", authenticator.authenticateLoggedUser, controllers.ride.loadSpecificRide);
    app.post("/rides/:id", authenticator.authenticateLoggedUserPostRequests, controllers.ride.removeRideById);

    app.post("/sign-for-ride", authenticator.authenticateLoggedUserPostRequests, controllers.ride.addPassenger);

    app.get("/add-ride", authenticator.authenticateLoggedUser, controllers.ride.loadNewRidePage);
    app.post("/add-ride", authenticator.authenticateLoggedUserPostRequests, validator.validateRideCreation, controllers.ride.addNewRide);
};