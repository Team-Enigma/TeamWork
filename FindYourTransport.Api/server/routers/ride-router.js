const controllers = require("../controllers");

module.exports = function(app) {
    app.get("/rides", controllers.ride.loadAllRides);

    app.get("/rides/:id", controllers.ride.loadSpecificRide);

    app.get("/calculate-price", controllers.ride.calculatePrice);

    app.get("/add-ride", controllers.ride.loadNewRidePage);
    app.post("/add-ride", controllers.ride.addNewRide);
};