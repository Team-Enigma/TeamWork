const controllers = require("../controllers");

module.exports = function(app, authenticator) {
    app.get("/rides", controllers.ride.loadAllRides);
    app.get("/rides/filtered", controllers.ride.loadFilteredRides);
    app.get("/rides/:id", controllers.ride.loadSpecificRide);

    app.get("/calculate-price", authenticator.authenticateLoggedUser, controllers.ride.calculatePrice);

    app.get("/add-ride", authenticator.authenticateLoggedUser, controllers.ride.loadNewRidePage);
    app.post("/add-ride", controllers.ride.addNewRide);
};