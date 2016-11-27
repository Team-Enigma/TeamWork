// let assert = require("chai").assert;
// let request = require("request");

// describe("ride-router.js testing", () => {

//     it("Get /rides should return status code 200", () => {
//         let url = "http://localhost:8080/rides";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /rides/filtered should return status code 200", () => {
//         let url = "http://localhost:8080/rides/filtered";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /rides/:id should return status code 200", () => {
//         let url = "http://localhost:8080/rides/:id";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /calculate-price should return status code 200", () => {
//         let url = "http://localhost:8080/calculate-price";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /add-ride should return status code 200", () => {
//         let url = "http://localhost:8080/add-ride";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Post /add-ride should return status code 409 of conflict", () => {
//         let url = "http://localhost:8080/add-ride";

//         request.post(url, (error, response) => {
//             assert.equal(409, response.statusCode);
//         });
//     });
// });