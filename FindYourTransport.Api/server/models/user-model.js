const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;

const userSchema = mongooseSchema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    // todo: change car model later
    car: { type: String }
});

const User = mongoose.model('user', userSchema);

module.exports = User;