const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;

const exrtaProfile = new Schema({
    _id:{
        type: String,
        required:true
    },
    gender:{
        type: String,
        required:true
    },
    dateOfBirth:{
        type: String,
        required:true
    },
    medicalSpecialty:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },    
});

module.exports = mongoodb.model("DoctorExrtaProfile",exrtaProfile);