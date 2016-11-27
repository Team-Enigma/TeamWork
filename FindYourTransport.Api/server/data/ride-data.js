const Ride = require("../models/ride-model");

function createNewRide(body, user) {
    return new Promise((resolve, reject) => {
        Ride.create({
                driver: user,
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
    return Ride.find().where("dateOfTravel")
        .gt(Date.now())
        .sort("dateOfTravel")
        .exec((err, rides) => {
            if (err) {
                return err;
            }

            return rides;
        })
        .then((rides) => {
            return rides;
        });
}

function getRidesForUser(user) {
    return Ride.find().where("driver")
        .eq(user.username)
        .exec((err, rides) => {
            if (err) {
                return err;
            }

            return rides;
        })
        .then((rides) => {
            return rides;
        });
}

function getFilteredRides(filter) {
    let rides = Ride.find();

    if (filter.fromCity !== undefined && filter.fromCity !== "") {
        rides.where("fromCity").eq(filter.fromCity);
    }

    if (filter.toCity !== undefined && filter.toCity !== "") {
        rides.where("toCity").eq(filter.toCity);
    }

    if (filter.startDate !== undefined && filter.startDate !== "") {
        rides.where("dateOfTravel").gte(filter.startDate);
    }

    if (filter.endDate !== undefined && filter.startDate !== "") {
        rides.where("dateOfTravel").lte(filter.endDate);
    }

    return rides
        .where("dateOfTravel")
        .gt(Date.now())
        .sort("dateOfTravel")
        .exec((err, rides) => {
            if (err) {
                return err;
            }
            return rides;
        })
        .then((rides) => {
            return rides;
        });
}

function getSpecificRide(id) {
    return Ride.findOne({ _id: id }, (err, ride) => {
            if (err) {
                return err;
            }

            return ride;
        })
        .then((ride) => {
            return ride;
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

module.exports = {
    addNewRide,
    getAllRides,
    getSpecificRide,
    getRidesForUser,
    getFilteredRides,
    updateRideInfo
};