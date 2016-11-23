const data = require("../data")();

function loadAllRides(req, res) {
    res.render("../views/ride-views/all-rides.pug");
}

function loadSpecificRide(req, res) {
    let id = +req.params.id;
    //let ride = req.rides.find(r => r.id === id);
    res.render("../views/ride-views/ride.pug", {
        //result: ride
    });
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