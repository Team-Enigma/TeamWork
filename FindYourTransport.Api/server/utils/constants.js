const user = {
    messages: {
        uniqueUsername: "A user with this username already exists",
        uniqueEmail: "A user with this email already exists",
        requiredUsername: "Username is required",
        requiredFirstName: "First name is required",
        requiredLastName: "Last name is required",
        requiredEmail: "Email is required",
        requiredPassword: "Password is required",
        requiredConfirmPassword: "Confirm password is required",
        personFirstName: "First name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. John)",
        personLastName: "Last name should contain latin letters and begin with capital letter and be between 2 and 30 characters (e.g. Doe)",
        username: "Username should contain latin letters both capital and small as well as digits and -._ symbols and be between 3 and 20 characters (e.g. john.42)",
        email: "Email should contain latin letters both capital and small as well as digits and -._ symbols (e.g. john.42@mail.com)",
        password: "Password should contain latin letters both capital and small as well as digits and special symbols and be between 3 and 20 characters (e.g. Pasword#!42)",
        confirmPassword: "Passwords does not match"
    },
    matchers: {
        personName: /^([A-Z]{1}[a-z]{1,30})$/,
        username: /^([A-Za-z0-9\-\._]{3,20})$/,
        email: /^([\w\d\-\._]+@[\w\d]+\.[\w]{2,3})$/,
        password: /^([A-Za-z0-9!@#%&\$\^\*\.\-_]{3,20})$/
    },
    enums: { roleTypes: ["User", "Admin"] }
};

const ride = {
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
    enums: {
        fuelTypes: ["ULP", "PULP", "CNG", "LPG", "Diesel", "Hybrid", "Electric"],
        transmissionTypes: ["Automatic", "Manual"]
    }
}

module.exports = {
    user,
    ride,
    car
};