const controllers = require("../controllers/ride-controller");

module.exports = function(app) {
    app.get("/rides", controllers.loadAllRides);

    app.get("/rides:id", controllers.loadSpecificRide);

    app.get("/calculate-price", controllers.calculatePrice);

    app.get("/add-ride", controllers.loadNewRidePage);
    app.post("/add-ride", controllers.addNewRide);
};