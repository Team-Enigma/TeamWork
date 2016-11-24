const data = require("../data")();
const pug = require("pug");

function loadAllRides(req, res) {
    var rides = data.getAllRides()
        .then((rides) => {
            res.render("ride-views/all-rides.pug", { rides: rides });
        });
}

function loadSpecificRide(req, res) {
    let id = req.params["id"],
        driver;

    var ride = data.getSpecificRide(id)
        .then((ride) => {
            console.log(ride);
            res.render("ride-views/ride.pug", { ride });
        });
}

function loadNewRidePage(req, res) {
    res.render("../views/ride-views/add-new-ride.pug");
}

function addNewRide(req, res) {
    const cashedRide = req.body;
    console.log(cashedRide);
    data.addNewRide(req.body, req.user)
        .then(() => {
            res.render("../views/ride-views/add-new-ride.pug");
        })
        .catch(err => {
            console.log("Here");
            console.log(err);
            const messages = [];

            if (err.errors) {
                Object.keys(err.errors).forEach((key) => {
                    const error = err.errors[key];
                    messages.push(error.message);
                });
            } else if (err.message) {
                messages.push(err.message);
            }

            cashedRide.messages = messages;

            console.log("problem");
            console.log(err);
            res.status(409);
            res.render("../views/ride-views/add-new-ride.pug", cashedRide);
            res.end();
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