const data = require("../data")();
const passport = require("passport");

function loadAllRides(req, res) {
    data.getAllRides(req.query)
        .then((rides) => {
            res.render("ride-views/all-rides.pug", { rides: rides });
        });
}

function loadSpecificRide(req, res) {
    let rideId = req.params["id"],
        currentUser = req.user;

    data.getSpecificRide(rideId)
        .then((resultRide) => {
            res.render("ride-views/ride.pug", { ride: resultRide, user: currentUser });
        })
        .catch((err) => {
            console.log(err);
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

            console.log(err);
            res.status(409);
            res.render("../views/ride-views/add-new-ride.pug", cashedRide);
            res.end();
        });
}

function calculatePrice(req, res) {


    res.render("../views/ride-views/calculate-price.pug");
}

function loadFilteredRides(req, res) {

    data.getFilteredRides(req.query)
        .then((rides) => {
            res.render("ride-views/all-rides.pug", { rides: rides });
        })
        .catch((err) => {
            console.log(err);
        });
}

function addPassenger(req, res) {
    var id = req.body.rideId,
        user = req.body.passengerUsername;

    data.getSpecificRide(id)
        .then((ride) => {
            console.log(ride);

            if (ride.passengers.indexOf(user) === -1) {
                ride.passengers.push(user);
                ride.freePlaces--;
            }

            return ride;
        })
        .then((ride) => {
            data.updateRideInfo(ride);
        })
        .then(() => {
            res.render(`/rides/${id}`);
        })
        .catch((err) => {
            console.log(err);
        });

}

function removeRideById(req, res) {
    var id = req.body.rideId;
    data.removeRideById(id)
        .then(() => {
            res.redirect(`/users/${req.user.username}`);
        });
}

module.exports = {
    loadAllRides,
    loadFilteredRides,
    loadSpecificRide,
    loadNewRidePage,
    addNewRide,
    addPassenger,
    calculatePrice,
    removeRideById
};