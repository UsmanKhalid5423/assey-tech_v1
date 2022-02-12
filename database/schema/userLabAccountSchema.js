const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const registrationSchemaForLab = new Schema({
    lab_name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone_number:{
        type: Number,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    passwordText:{
        type: String,
        required:true
    },
    startDate:{
        type: Date,
        required:true
    },
    // change by usman khalid
    isEmailVerified:{
        type: Boolean,
        default: false,
        required: false,
    },
    OTP:{
        type: String,
        required:false
    },
   
});

module.exports = mongoodb.model("LabAccount",registrationSchemaForLab);