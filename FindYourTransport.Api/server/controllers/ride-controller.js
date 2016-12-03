module.exports = (data, passport, constants) => {

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

    function loadFilteredRides(req, res) {
        let toCity = req.query.toCity;
        let fromCity = req.query.fromCity;
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;
        let pageSize = parseInt(req.query.size) || 5,
            currentPage = parseInt(req.query.page) || 1,
            pagesCount,
            allRidesLength;

        data.getFilteredRides(req.query)
            .then((rides) => {
                pagesCount = Math.ceil(rides.length / pageSize);

                allRidesLength = rides.length;
                console.log(rides.length);

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
                res.render("ride-views/all-rides.pug", { toCity, fromCity, startDate, endDate, rides: pagedRides, pageSize, currentPage, pagesCount, length: allRidesLength });
            })
            .catch((err) => {
                return err;
            });
    }

    function addNewRide(req, res) {
        data.addNewRide(req.body, req.user)
            .then(() => {
                res.status(201);
                return res.json("{\"success\": \"Successful ride creation.\"}");
            })
            .catch(err => {
                res.status(400);
                return res.json(`{"error": "Problem occured while adding a new ride. ${err.message}"}`);
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
                res.status(201);
                return res.json("{\"success\": \"Successful sign for ride. Enjoy your trip. \"}");
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "Problem occured while signing for a ride. ${err.message}"}`);
            });

    }

    function removeRideById(req, res) {
        const id = req.body.rideId;
        console.log(req.body);
        data.removeRideById(id)
            .then(() => {
                res.status(201);
                return res.json("{\"success\": \"Successfully removed ride. \"}");
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "Problem occured while removing ride. ${err.message}"}`);
            });
    }

    function removePassenger(req, res) {
        const rideId = req.body.rideId;
        const passenger = req.body.passengerUsername;

        data.getSpecificRide(rideId)
            .then((ride) => {
                if (ride.passengers.indexOf(passenger) !== -1) {
                    let index = ride.passengers.indexOf(passenger);
                    ride.passengers.splice(index, 1);
                    ride.freePlaces += 1;
                }

                return ride;
            })
            .then((ride) => {
                data.updateRideInfo(ride);
            })
            .then(() => {
                res.status(200);
                return res.json("{\"success\": \"Successfully unsigned from ride. \"}")
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "Problem occured while unsigning from ride. ${err.message}"}`);
            });
    }

    return {
        name: "ride",
        loadFilteredRides,
        loadSpecificRide,
        loadNewRidePage,
        addNewRide,
        addPassenger,
        removeRideById,
        removePassenger
    };
};