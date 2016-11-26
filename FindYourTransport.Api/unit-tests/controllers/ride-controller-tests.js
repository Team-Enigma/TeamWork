var chai = require("chai").assert;
var expect = require("chai").expect;
var rideController = require("../../server/controllers/ride-controller");
//var mockery = require("mockery");
var sinon = require("sinon");

describe('User-controller.js testing', function() {

    it('loadFilteredUsers should be a function', function() {
        expect(rideController.addNewRide).to.be.a('function');
    });

    it('loadLoginPage should be a function', function() {
        expect(rideController.addPassenger).to.be.a('function');
    });

    it('loadRegisterPage should be a function', function() {
        expect(rideController.calculatePrice).to.be.a('function');
    });

    it('loadUserByUserName should be a function', function() {
        expect(rideController.loadAllRides).to.be.a('function');
    });

    it('loadUsers should be a function', function() {
        expect(rideController.loadFilteredRides).to.be.a('function');
    });

    it('loginUser should be a function', function() {
        expect(rideController.loadNewRidePage).to.be.a('function');
    });

    it('logoutUser should be a function', function() {
        expect(rideController.loadSpecificRide).to.be.a('function');
    });
});