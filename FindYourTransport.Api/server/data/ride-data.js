const Ride = require("../models/ride-model");

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
    return Ride.find()
        .where("isRemoved")
        .equals(false)
        .where("dateOfTravel")
        .gt(Date.now())
        .sort("dateOfTravel")
        .exec((err, rides) => {
            if (err) {
                return err;
            }

            return rides;
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
    let filteredRides = Ride.find();
    console.log(filter);
    if (filter.fromCity !== undefined && filter.fromCity !== "") {
        filteredRides.where("fromCity").eq(filter.fromCity);
    }

    if (filter.toCity !== undefined && filter.toCity !== "") {
        filteredRides.where("toCity").eq(filter.toCity);
    }

    if (filter.startDate !== undefined && filter.startDate !== "") {
        filteredRides.where("dateOfTravel").gte(filter.startDate);
    }

    if (filter.endDate  !== undefined && filter.endDate !== "") {
        filteredRides.where("dateOfTravel").lte(filter.endDate);
    }

    return filteredRides
        .where("isRemoved")
        .equals(false)
        .where("dateOfTravel")
        .gt(Date.now())
        .sort("dateOfTravel")
        .exec((err, rides) => {
            if (err) {
                return err;
            }
            return rides;
        });
}

function getSpecificRide(id) {
    return Ride.findOne({ _id: id }, (err, ride) => {
        if (err) {
            return err;
        }

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

module.exports = {
    addNewRide,
    getAllRides,
    getSpecificRide,
    getRidesForUser,
    getFilteredRides,
    updateRideInfo,
    removeRideById
};