// var assert = require("chai").assert;
// var expect = require("chai").expect;
// var request = require("request");

// describe('ride-router.js testing', function() {

//     it('Get /rides should return status code 200', function() {
//         var url = "http://localhost:8080/rides";

//         request.get(url, function(error, response, body) {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it('Get /rides/filtered should return status code 200', function() {
//         var url = "http://localhost:8080/rides/filtered";

//         request.get(url, function(error, response, body) {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it('Get /rides/:id should return status code 200', function() {
//         var url = "http://localhost:8080/rides/:id";

//         request.get(url, function(error, response, body) {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it('Get /calculate-price should return status code 200', function() {
//         var url = "http://localhost:8080/calculate-price";

//         request.get(url, function(error, response, body) {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it('Get /add-ride should return status code 200', function() {
//         var url = "http://localhost:8080/add-ride";

//         request.get(url, function(error, response, body) {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it('Post /add-ride should return status code 409 of conflict', function() {
//         var url = "http://localhost:8080/add-ride";

//         request.post(url, function(error, response, body) {
//             assert.equal(409, response.statusCode);
//         });
//     });
// });