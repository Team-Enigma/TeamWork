var chai = require("chai").assert;
var expect = require("chai").expect;
var userData = require("../../server/data/user-data");
// var mockery = require("mockery");
// var sinon = require("sinon");
var User = require("../../server/models/user-model");

describe('User-data.js testing', function() {

    it('registerNewUser should be a function', function() {
        expect(userData.registerNewUser).to.be.a('function');
    });

    it('getFilteredUsers should be a function', function() {
        expect(userData.getFilteredUsers).to.be.a('function');
    });

    it('getAllUsers should be a function', function() {
        expect(userData.getAllUsers).to.be.a('function');
    });

    it('getSpecificUser should be a function', function() {
        expect(userData.getUserByUsername).to.be.a('function');
    });
});