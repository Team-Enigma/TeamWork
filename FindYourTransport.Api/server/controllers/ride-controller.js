const data = require("../data")();
const passport = require("passport");

function loadAllRides(req, res) {
    var rides = data.getAllRides(req.query)
        .then((rides) => {
            res.render("ride-views/all-rides.pug", { rides: rides });
        });
}

function loadSpecificRide(req, res) {
    let rideId = req.params["id"],
        currentUser = req.user;

    if (!currentUser) {
        res.redirect("/login");
    } else {
        data.getSpecificRide(rideId)
            .then((resultRide) => {
                res.render("ride-views/ride.pug", { ride: resultRide, user: currentUser });
            })
            .then(() => {
                res.redirect("/rides/" + rideId);
            });
    }
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
    var id = req.query.rideId,
        user = req.query.passengerUsername;

    data.getSpecificRide(id)
        .then((ride) => {
            ride.passengers.push(user);
            ride.freePlaces--;
        })
        .then(() => {
            res.redirect("/users/" + user);
        })
        .catch((err) => {
            console.log(err);
        });

}

module.exports = {
    loadAllRides,
    loadFilteredRides,
    loadSpecificRide,
    loadNewRidePage,
    addNewRide,
    addPassenger,
    calculatePrice
};