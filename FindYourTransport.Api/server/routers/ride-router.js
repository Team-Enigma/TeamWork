const queryStringBuilder = require("../utils/query-string-builder");

module.exports = function(app, authenticator, validator, controllers) {
    app.get("/rides", controllers.ride.loadFilteredRides);
    app.get("/rides/add", authenticator.authenticateLoggedUser, controllers.ride.loadNewRidePage);
    app.post("/rides/add", authenticator.authenticateLoggedUserPostRequests, validator.validateRideCreation, controllers.ride.addNewRide);
    app.get("/rides/:id", authenticator.authenticateLoggedUser, controllers.ride.loadSpecificRide);
    app.post("/rides/:id", authenticator.authenticateLoggedUserPostRequests, controllers.ride.addPassenger);
    app.put("/rides/:id", authenticator.authenticateLoggedUser, controllers.ride.removePassenger);
    app.delete("/rides/:id", authenticator.authenticateLoggedUserPostRequests, controllers.ride.removeRideById);

};