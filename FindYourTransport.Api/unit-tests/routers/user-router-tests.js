// let assert = require("chai").assert;
// let request = require("request");

// describe("user-router.js testing", () => {

//     it("Get /register should return status code 200", () => {
//         let url = "http://localhost:8080/register";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /login should return status code 200", () => {
//         let url = "http://localhost:8080/login";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /logout should return status code 200", () => {
//         let url = "http://localhost:8080/logout";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /users should return status code 200", () => {
//         let url = "http://localhost:8080/users";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /users:id should return status code 404", () => {
//         let url = "http://localhost:8080/users:id";

//         request.get(url, (error, response) => {
//             assert.equal(404, response.statusCode);
//         });
//     });

//     it("Get /users/filtered should return status code 200", () => {
//         let url = "http://localhost:8080/users/filtered";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Get /logout should return status code 200", () => {
//         let url = "http://localhost:8080/logout";

//         request.get(url, (error, response) => {
//             assert.equal(200, response.statusCode);
//         });
//     });

//     it("Post /register should return status code 409", () => {
//         let url = "http://localhost:8080/register";

//         request.post(url, (error, response) => {
//             assert.equal(409, response.statusCode);
//         });
//     });

//     it("Post /register should return status code 409", () => {
//         let url = "http://localhost:8080/login";

//         request.post(url, (error, response) => {
//             assert.equal(409, response.statusCode);
//         });
//     });
// });