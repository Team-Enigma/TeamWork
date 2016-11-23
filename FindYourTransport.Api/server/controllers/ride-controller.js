const data = require("../data")();
const pug = require("pug");

function loadAllRides(req, res) {
    var rides = data.getAllRides()
        .then((rides) => {
            res.render("ride-views/all-rides.pug", { rides: rides });

            //res.render("../views/ride-views/all-rides.pug");
        });
}

function loadSpecificRide(req, res) {
    let id = req.params["id"];

    var ride = data.getSpecificRide(id)
        .then((ride) => {
            console.log(ride);
            res.render("ride-views/ride.pug", { ride });
        });
    //res.render("../views/ride-views/ride.pug", {
    //    ride: ride
    //});
}

function loadNewRidePage(req, res) {
    res.render("../views/ride-views/add-new-ride.pug");
}

function addNewRide(req, res) {
    data.addNewRide(req.body)
        .then(() => {
            res.render("../views/ride-views/add-new-ride.pug");
        });
}

function calculatePrice(req, res) {


    res.render("../views/ride-views/calculate-price.pug");
}

module.exports = {
    loadAllRides,
    loadSpecificRide,
    loadNewRidePage,
    addNewRide,
    calculatePrice
};