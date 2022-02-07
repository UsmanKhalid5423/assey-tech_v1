const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;
const admin = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}
);

module.exports = mongoodb.model("admin", admin);