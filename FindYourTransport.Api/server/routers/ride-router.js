const controllers = require("../controllers");

module.exports = function(app) {
    // app.get("/rides", controllers.loadAllRides);
    //
    // app.get("/rides:id", controllers.loadSpecificRide);
    //
    // app.get("/calculate-price", controllers.calculatePrice);

    app.get("/add-ride", controllers.ride.loadNewRidePage);
    app.post("/add-ride", controllers.ride.addNewRide);
};