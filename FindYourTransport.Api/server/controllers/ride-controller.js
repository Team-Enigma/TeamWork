module.exports = (data, passport, constants) => {
    function loadAllRides(req, res) {
        let pageSize = parseInt(req.query.size) || 5,
            currentPage = parseInt(req.query.page) || 1,
            pagesCount,
            allRidesLength;

        data.getAllRides()
            .then((rides) => {
                pagesCount = Math.ceil(rides.length / pageSize);

                allRidesLength = rides.length;

                if (allRidesLength % 5 !== 0) {
                    allRidesLength += 5 - allRidesLength % 5;
                }

                let end = pageSize * (currentPage - 1) + pageSize;

                if (end > rides.length) {
                    end = rides.length;
                }

                return rides.slice(pageSize * (currentPage - 1), end);
            })
            .then((pagedRides) => {
                res.render("ride-views/all-rides.pug", { rides: pagedRides, pageSize, currentPage, pagesCount, length: allRidesLength });
            })
            .catch((err) => {
                const messages = [];

                if (err.errors) {
                    Object.keys(err.errors).forEach((key) => {
                        const error = err.errors[key];
                        messages.push(error.message);
                    });
                } else if (err.message) {
                    messages.push(err.message);
                }

                console.log(messages);
                //logger.addMessages(messages);
            });
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

    function loadFilteredRides(req, res) {
        let pageSize = parseInt(req.query.size) || 5,
            currentPage = parseInt(req.query.page) || 1,
            pagesCount,
            allRidesLength;

        data.getFilteredRides(req.query)
            .then((rides) => {
                pagesCount = Math.ceil(rides.length / pageSize);

                allRidesLength = rides.length;

                if (allRidesLength % 5 !== 0) {
                    allRidesLength += 5 - allRidesLength % 5;
                }

                let end = pageSize * (currentPage - 1) + pageSize;

                if (end > rides.length) {
                    end = rides.length;
                }

                return rides.slice(pageSize * (currentPage - 1), end);
            })
            .then((pagedRides) => {
                res.render("ride-views/all-rides.pug", { rides: pagedRides, pageSize, currentPage, pagesCount, length: allRidesLength });
            })
            .catch((err) => {
                return err;
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

    return {
        name: "ride",
        loadAllRides,
        loadFilteredRides,
        loadSpecificRide,
        loadNewRidePage,
        addNewRide,
        addPassenger,
        removeRideById
    };
};