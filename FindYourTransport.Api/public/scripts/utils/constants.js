/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

(function() {

    const user = {
        messages: {
            uniqueUsername: "A user with this username already exists",
            uniqueEmail: "A user with this email already exists",
            requiredUsername: "Username is required",
            requiredFirstName: "First name is required",
            requiredLastName: "Last name is required",
            requiredEmail: "Email is required",
            requiredPassword: "Password is required",
            requiredOldPassword: "Old password is required",
            requiredNewPassword: "New password is required",
            requiredConfirmPassword: "Confirm password is required",
            personFirstName: "First name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. John)",
            personLastName: "Last name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. Doe)",
            username: "Username should contain latin letters both capital and small as well as digits and -._ symbols and be between 3 and 20 characters (e.g. john.42)",
            email: "Email should contain latin letters both capital and small as well as digits and -._ symbols (e.g. john.42@mail.com)",
            city: "City name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. Sofia)",
            contact: "Contact information should contain latin letters both capital and small as well as digits and -.+() and be between 3 and 20 characters (e.g. +359 2 424 4242)",
            password: "Password should contain latin letters both capital and small as well as digits and special symbols and be between 3 and 20 characters (e.g. Pasword#!42)",
            confirmPassword: "Passwords does not match"
        },
        matchers: {
            personName: /^([A-Z]{1}[a-z]{1,30})$/,
            city: /^([A-Z]{1}[a-z\s]{1,30})$/,
            username: /^([A-Za-z0-9\-\._]{3,20})$/,
            email: /^([\w\d\-\._]+@[\w\d]+\.[\w]{2,3})$/,
            contact: /^([A-Za-z0-9\+\s\.\-\+\(\)]{3,20})$/,
            password: /^([A-Za-z0-9!@#%&\$\^\*\.\-_]{3,40})$/
        },
        enums: { roleTypes: ["User", "Admin"] }
    };

    const ride = {
        minPrice: 0,
        maxPrice: 1000,
        messages: {
            requiredStartCity: "Start city is required",
            requiredEndCity: "End city is required",
            requiredDate: "Date is required",
            requiredPrice: "Price is required",
            requiredContact: "Contact information is required",
            city: "City name should contain only latin letters and be between 2 and 30 characters (e.g. Sofia)",
            date: "Date cannot be set before current date and time",
            price: "Price should be between 0 and 1000",
            priceNumber: "Price should be a valid number"
        },
        matchers: {
            city: /^([\w+\s*]{2,30})$/,
            price: /^([0-9]+)$/
        }
    };

    const car = {
        messages: {
            requiredManufacturer: "Manufacturer is required",
            requiredModel: "Model is required",
            requiredRegistrationNumber: "Registration number is required",
            manufacturer: "Manufacturer should contain only latin letters and be between 2 and 25 symbols long",
            model: "Model should contain only latin letters and be between 2 and 15 symbols long",
            registrationNumber: "Registration number should contain a latin letter, followed by 4 digits and two more latin letters (e.g. C2332KK)"
        },
        matchers: {
            manufacturer: /^([\w+\s*]{2,25})$/,
            model: /^([\w+\s*]{2,15})$/,
            registrationNumber: /^[A-Z]{1,2}[0-9]{4}[A-Z]{2}$/
        },
        enums: {
            fuelTypes: ["ULP", "PULP", "CNG", "LPG", "Diesel", "Hybrid", "Electric"],
            transmissionTypes: ["Automatic", "Manual"]
        }
    };

    const contact = {
        enums: { statusTypes: ["Not Processed", "In Process", "Processed"] },
        messages: {
            requiredUsername: "Username is required",
            requiredAddress: "Address is required",
            requiredTitle: "Title is required",
            requiredContent: "The message should not be empty",
            username: "Username should contain latin letters both capital and small as well as digits and -._ symbols and be between 3 and 20 characters (e.g. john.42)",
            address: "Email should contain latin letters both capital and small as well as digits and -._ symbols (e.g. john.42@mail.com)",
            title: "Title should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. Title)",
            content: "Content could contain latin letters numbers and special symbols and have length between 5 and 1000"
        },
        matchers: {
            username: /^([A-Za-z0-9\-\._]{2,30})$/,
            address: /^([\w\d\-\._]+@[\w\d]+\.[\w]{2,3})$/,
            title: /^([A-Z]{1}[A-Za-z\s]{1,30})$/,
            content: /^([A-Za-z0-9@#%&!:;,_"'~\$\^\(\)\[\]\{\}\*\\\-\.\?\s]{5,1000})$/
        }
    };

    const fuel = {
        messages: {
            requiredDistance: "Distance is required",
            requiredConsumption: "Consumption is required",
            distance: "Distance should be a valid number (e.g. 14.4 or 14,2)",
            consumption: "Consumption should be a valid number (e.g. 4.2 or 6,4)"
        },
        matchers: { number: /^((?:\d*\.)?\d+)$/ }
    };

    const comment = {
        messages: {
            requiredComment: "Comment is required",
            comment: "Comment could contain latin letters, numbers and special symbols and have length between 5 and 1000"
        },
        matchers: { comment: /^([A-Za-z0-9@#%&!:;,_"'~\$\^\(\)\[\]\{\}\*\\\-\.\?\s]{5,1000})$/ }
    };

    app.constants = {
        user,
        ride,
        car,
        contact,
        fuel,
        comment
    };
}());