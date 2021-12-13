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
   
});

module.exports = mongoodb.model("LabAccount",registrationSchemaForLab);