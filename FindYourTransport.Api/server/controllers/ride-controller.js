const data = require("../data")();

function loadAllRides(req, res) {
    loadFilteredRides(req, res);

    // let pageSize = parseInt(req.body.pageSize) || 5;

    // let pagesCount = data.getAllRides().then((rides) => {
    //     return Math.ceil(rides.length / pageSize);
    // });

    // data.getFilteredRides(req.body)
    //     .then((rides) => {
    //         res.render("ride-views/all-rides.pug", { rides, pagesCount });
    //     });
}

function loadSpecificRide(req, res) {
    const rideId = req.params.id;

    data.getSpecificRide(rideId)
        .then((resultRide) => {
            res.render("ride-views/ride.pug", { ride: resultRide });
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
    data.addNewRide(req.body, req.user)
        .then(() => {
            res.render("../views/ride-views/add-new-ride.pug");
        })
        .catch(err => {
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

            res.status(409);
            res.render("../views/ride-views/add-new-ride.pug", cashedRide);
            res.end();
        });
}

function calculatePrice(req, res) {
    res.render("../views/ride-views/calculate-price.pug");
}

function loadFilteredRides(req, res) {
    let pageSize = req.query.size !== undefined ? req.query.size : 5;
    let currentPage = req.query.page !== undefined ? req.query.page : 1;

    data.getFilteredRides(req.query)
        .then((rides) => {
            let pagesCount = Math.ceil(rides.length / pageSize);

            res.render("ride-views/all-rides.pug", { rides, pageSize, currentPage, pagesCount });
        })
        .catch((err) => {
            console.log(err);
        });
}

function addPassenger(req, res) {
    const id = req.body.rideId,
        user = req.body.passengerUsername;

    data.getSpecificRide(id)
        .then((ride) => {

            if (ride.passengers.indexOf(user) === -1) {
                ride.passengers.push(user);
                ride.freePlaces -= 1;
            }

            return ride;
        })
        .then((ride) => {
            data.updateRideInfo(ride);
        })
        .then(() => {
            res.redirect(`/rides/${id}`);
        })
        .catch((err) => {
            console.log(err);
        });

}

function removeRideById(req, res) {
    const id = req.body.rideId;
    data.removeRideById(id)
        .then(() => {
            res.redirect("/profile");
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