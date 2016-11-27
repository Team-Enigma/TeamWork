var chai = require("chai").assert;
var expect = require("chai").expect;
var homeController = require("../../server/controllers/home-controller");
//var mockery = require("mockery");
var sinon = require("sinon");

describe('Home-controller.js testing', function() {

    it('loadHomePage should be a function', function() {
        expect(homeController.loadHomePage).to.be.a('function');
    });

    it('redirectToHomePage should be a function', function() {
        expect(homeController.redirectToHomePage).to.be.a('function');
    });
});