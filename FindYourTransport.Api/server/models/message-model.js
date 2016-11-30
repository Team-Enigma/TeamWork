const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;

const messageSchema = mongooseSchema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    content: { type: String, required: true }
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;