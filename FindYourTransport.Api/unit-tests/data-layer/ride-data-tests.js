var chai = require("chai").assert;
var expect = require("chai").expect;
var rideData = require("../../server/data/ride-data");
// var mockery = require("mockery");
// var sinon = require("sinon");
var User = require("../../server/models/ride-model");

describe('Ride-data.js testing', function() {

    it('addNewRide should be a function', function() {
        expect(rideData.addNewRide).to.be.a('function');
    });

    it('getAllRides should be a function', function() {
        expect(rideData.getAllRides).to.be.a('function');
    });

    it('getFilteredRides should be a function', function() {
        expect(rideData.getFilteredRides).to.be.a('function');
    });

    it('getRidesForUser should be a function', function() {
        expect(rideData.getRidesForUser).to.be.a('function');
    });

    it('getSpecificRide should be a function', function() {
        expect(rideData.getSpecificRide).to.be.a('function');
    });
});