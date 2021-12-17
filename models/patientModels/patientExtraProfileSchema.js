const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;

const exrtaProfilePatient = new Schema({
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
    insurence_Info:{
        type: String,
        required:true
    },
    genetic_Disease:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    // image:{
    //     type: String,
    //     get:(images)=>{ return `${appurl}/${images}`; }
    } 
// }
);

module.exports = mongoodb.model("PatientExrtaProfile",exrtaProfilePatient);