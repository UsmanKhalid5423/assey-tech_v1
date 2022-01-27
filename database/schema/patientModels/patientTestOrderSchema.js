const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const patientTestOrder = new Schema({
    id:{
        type: String,
        required:false
    },
    patient_name:{
        type: String,
        required:true
    },
    patient_phone:{
        type: String,
        required:true
    },
    patient_address:{
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
   
},{timestamps:true});

module.exports = mongoodb.model("patient_testOrder",patientTestOrder);