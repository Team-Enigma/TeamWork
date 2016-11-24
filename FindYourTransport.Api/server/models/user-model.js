const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;
const encryption = require("../utils/encryption.js");
const carSchema = require("./car-model");

const personFirstNameErrorMessage = "First name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. John)";
const personLastNameErrorMessage = "Last name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. Doe)";
const usernameErrorMessage = "Username should contain latin letters both capital and small as well as digits and -._ symbols and be between 3 and 20 characters (e.g. john.42)";
const emailErrorMessage = "Email should contain latin letters both capital and small as well as digits and -._ symbols (e.g. john.42@mail.com)";

const personFirstNameMatcher = [/^([A-Z]{1}[a-z]{1,30})$/, personFirstNameErrorMessage];
const personLastNameMatcher = [/^([A-Z]{1}[a-z]{1,30})$/, personLastNameErrorMessage];
const usernameMatcher = [/^([A-Za-z0-9\-\._]{3,20})$/, usernameErrorMessage];
const emailMatcher = [/^([\w\d\-\._]+@[\w\d]+\.[\w]{2,3})$/, emailErrorMessage];

const userSchema = mongooseSchema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        match: usernameMatcher
    },
    hashedPassword: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: {
        type: String,
        required: [true, "First name is required"],
        match: personFirstNameMatcher
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        match: personLastNameMatcher
    },
    email: {
        type: String,
        unique: [true, "A user with this email already exists"],
        required: [true, "Email is required"],
        match: emailMatcher
    },
    car: { type: carSchema, default: {} }
});

userSchema.methods = {
    authenticate(password) {
        const requestedHashedPassword = encryption.generateHashedPassword(this.salt, password);
        return requestedHashedPassword === this.hashedPassword;
    }
};
const User = mongoose.model("user", userSchema);

module.exports = User;