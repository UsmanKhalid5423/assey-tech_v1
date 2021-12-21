const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;
const appurl = "http://localhost:3000";

const exrtaProfile = new Schema({
    _id: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    medicalSpecialty: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
    //     get:(images)=>{ return `${appurl}/${images}`; }
}
    // }
);

module.exports = mongoodb.model("DoctorExrtaProfile", exrtaProfile);