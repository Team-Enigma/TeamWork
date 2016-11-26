var chai = require("chai").assert;
var expect = require("chai").expect;
var userController = require("../../server/controllers/user-controller");
//var mockery = require("mockery");
var sinon = require("sinon");

describe('User-controller.js testing', function() {

    it('loadFilteredUsers should be a function', function() {
        expect(userController.loadFilteredUsers).to.be.a('function');
    });

    it('loadLoginPage should be a function', function() {
        expect(userController.loadLoginPage).to.be.a('function');
    });

    it('loadRegisterPage should be a function', function() {
        expect(userController.loadRegisterPage).to.be.a('function');
    });

    it('loadUserByUserName should be a function', function() {
        expect(userController.loadUserByUserName).to.be.a('function');
    });

    it('loadUsers should be a function', function() {
        expect(userController.loadUsers).to.be.a('function');
    });

    it('loginUser should be a function', function() {
        expect(userController.loginUser).to.be.a('function');
    });

    it('logoutUser should be a function', function() {
        expect(userController.logoutUser).to.be.a('function');
    });

    it('registerNewUser should be a function', function() {
        expect(userController.registerNewUser).to.be.a('function');
    });
});