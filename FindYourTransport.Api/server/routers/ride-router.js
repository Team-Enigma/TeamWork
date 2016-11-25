const controllers = require("../controllers");
const queryStringBuilder = require("../utils/query-string-builder");

module.exports = function(app, authenticator, validator) {
    app.get("/rides", (req, res) => {
        if (req.query) {
            controllers.ride.loadFilteredRides(req, res);
        } else {
            controllers.ride.loadAllRides(req, res);
        }
    });
    app.get("/rides/:id", controllers.ride.loadSpecificRide);
    app.post("/rides", queryStringBuilder.buildAndRedirect);

    app.get("/calculate-price", authenticator.authenticateLoggedUser, controllers.ride.calculatePrice);

    app.get("/add-ride", authenticator.authenticateLoggedUser, controllers.ride.loadNewRidePage);
    app.post("/add-ride", validator.validateRideCreation, controllers.ride.addNewRide);
};