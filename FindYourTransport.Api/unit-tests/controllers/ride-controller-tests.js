var chai = require("chai").assert;
var expect = require("chai").expect;
var rideController = require("../../server/controllers/ride-controller");
//var mockery = require("mockery");
var sinon = require("sinon");

describe('Ride-controller.js testing', function() {

    it('addNewRide should be a function', function() {
        expect(rideController.addNewRide).to.be.a('function');
    });

    it('addPassenger should be a function', function() {
        expect(rideController.addPassenger).to.be.a('function');
    });

    it('calculatePrice should be a function', function() {
        expect(rideController.calculatePrice).to.be.a('function');
    });

    it('loadAllRides should be a function', function() {
        expect(rideController.loadAllRides).to.be.a('function');
    });

    it('loadFilteredRides should be a function', function() {
        expect(rideController.loadFilteredRides).to.be.a('function');
    });

    it('loadNewRidePage should be a function', function() {
        expect(rideController.loadNewRidePage).to.be.a('function');
    });

    it('loadSpecificRide should be a function', function() {
        expect(rideController.loadSpecificRide).to.be.a('function');
    });
});