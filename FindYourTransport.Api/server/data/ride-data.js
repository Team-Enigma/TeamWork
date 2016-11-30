module.exports = (models) => {
    let { Ride } = models;

    function createNewRide(body, user) {
        return new Promise((resolve, reject) => {
            Ride.create({
                    driver: user.username,
                    fromCity: body.fromCity,
                    toCity: body.toCity,
                    dateOfTravel: Date.parse(body.dateOfTravel),
                    freePlaces: body.freePlaces,
                    price: body.price,
                    contact: body.contact,
                    remarks: body.remarks
                })
                .then(() => {
                    return resolve();
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    function addNewRide(body, user) {
        return new Promise((resolve, reject) => {
            Ride.findOne({
                    fromCity: body.fromCity,
                    toCity: body.toCity,
                    dateOfTravel: Date.parse(body.dateOfTravel),
                    freePlaces: body.freePlaces,
                    price: body.price
                })
                .then(ride => {
                    if (ride) {
                        throw new Error("Ride already exists!");
                    }
                })
                .then(() => {
                    return createNewRide(body, user);
                })
                .then(() => {
                    return resolve();
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    function getAllRides() {
        return new Promise((resolve, reject) => {
            let query = Ride.find()
                .where("isRemoved")
                .equals(false)
                .where("dateOfTravel")
                .gt(Date.now())
                .sort("dateOfTravel");

            query.exec((err, rides) => {
                if (err) {
                    return reject(err);
                }

                return resolve(rides);
            });
        });
    }

    function getRidesForUser(username) {
        return Ride.find()
            .where("isRemoved")
            .equals(false)
            .where("driver")
            .equals(username)
            .sort("dateOfTravel")
            .exec((err, rides) => {
                if (err) {
                    return err;
                }

                return rides;
            });
    }

    function getFilteredRides(filter) {
        let query = Ride.find(),
            pageSize = parseInt(filter.size) || 5,
            page = parseInt(filter.page) || 1;

        if (filter.fromCity !== undefined && filter.fromCity !== "") {
            query.where({ fromCity: new RegExp(filter.fromCity, "i") });
        }

        if (filter.toCity !== undefined && filter.toCity !== "") {
            query.where({ toCity: new RegExp(filter.toCity, "i") });
        }

        if (filter.startDate !== undefined && filter.startDate !== "") {
            query.where("dateOfTravel").gte(filter.startDate);
        }

        if (filter.endDate !== undefined && filter.endDate !== "") {
            query.where("dateOfTravel").lte(filter.endDate);
        }

        return query
            .where("isRemoved")
            .equals(false)
            .where("dateOfTravel")
            .gt(Date.now())
            .sort("dateOfTravel")
            .skip(pageSize * (page - 1))
            .limit(pageSize * (page - 1) + pageSize)
            .exec((err, rides) => {
                if (err) {
                    return err;
                }
                return rides;
            });
    }

    function getSpecificRide(id) {
        return new Promise((resolve, reject) => {
            Ride.findOne({ _id: id }, (err, ride) => {
                if (err) {
                    return reject(err);
                }

                return resolve(ride || null);
            });
        });
    }

    function updateRideInfo(ride) {
        Ride.update({ _id: ride._id }, { freePlaces: ride.freePlaces, passengers: ride.passengers }, null, (err) => {
            if (err) {
                return err;
            }

            return;
        });
    }

    function removeRideById(rideId) {
        return new Promise((resolve, reject) => {
            Ride.update({ _id: rideId }, { isRemoved: true }, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    return {
        addNewRide,
        getAllRides,
        getSpecificRide,
        getRidesForUser,
        getFilteredRides,
        updateRideInfo,
        removeRideById
    };
};