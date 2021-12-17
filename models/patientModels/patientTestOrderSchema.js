const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const patientTestOrder = new Schema({
    patient_name:{
        type: String,
        required:true
    },
    patient_email:{
        type: String,
        required:true
    },
    phone_number:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    test_name:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
   
});

module.exports = mongoodb.model("patient_testOrder",patientTestOrder);