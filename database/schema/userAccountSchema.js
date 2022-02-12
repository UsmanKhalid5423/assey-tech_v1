const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const registrationSchema = new Schema({
    full_name:{
        type: String,
        required:true
    },
    age:{
        type: Number,
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

module.exports = mongoodb.model("account",registrationSchema);