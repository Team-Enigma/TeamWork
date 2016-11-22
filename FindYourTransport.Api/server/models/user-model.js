const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;

const personFirstNameErrorMessage = "First name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. John)";
const personLastNameErrorMessage = "Last name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. Doe)";
const usernameErrorMessage = "Username should contain latin letters both capital and small as well as digits and -._ symbols and be between 3 and 20 characters (e.g. john.42)";
const passwordErrorMessage = "Password should contain latin letters both capital and small as well as digits and special symbols and be between 3 and 20 characters (e.g. Pasword#!42)";
const emailErrorMessage = "Email should contain latin letters both capital and small as well as digits and -._ symbols (e.g. john.42@mail.com)";

const personFirstNameMatcher = [/^([A-Z]{1}[a-z]{1,30})$/, personFirstNameErrorMessage];
const personLastNameMatcher = [/^([A-Z]{1}[a-z]{1,30})$/, personLastNameErrorMessage];
const usernameMatcher = [/^([A-Za-z0-9\-\._]{3,20})$/, usernameErrorMessage];
const passwordMatcher = [/^([A-Za-z0-9!@#%&\$\^\*\.\-_]{3,20})$/, passwordErrorMessage];
const emailMatcher = [/^([\w\d\-\._]+@[\w\d]+\.[\w]{2,3})$/, emailErrorMessage];

const userSchema = mongooseSchema({
    username: { type: String, required: true, unique: true, match: usernameMatcher },
    password: { type: String, required: true, match: passwordMatcher },
    firstName: { type: String, required: true, match: personFirstNameMatcher },
    lastName: { type: String, required: true, match: personLastNameMatcher },
    email: { type: String, unique: true, match: emailMatcher },
    // todo: change car model later
    car: { type: String }
});

userSchema.methods = {
    isValidPassword(password) {
        const isValid = password === this.password;
        return isValid;
    }
};
const User = mongoose.model("user", userSchema);

module.exports = User;