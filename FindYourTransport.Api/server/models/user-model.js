const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;

const userSchema = mongooseSchema({
    username: { type: "String" },
    password: { type: "String" },
    firstName: { type: "String" },
    lastName: { type: "String" },
    email: { type: "String" },
    // todo: change car model later
    car: { type: "String" }
});

const User = mongoose.model("user", userSchema);

module.exports = User;