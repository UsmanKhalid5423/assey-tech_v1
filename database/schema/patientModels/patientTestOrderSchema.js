const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const patientTestOrder = new Schema({
    id:{
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