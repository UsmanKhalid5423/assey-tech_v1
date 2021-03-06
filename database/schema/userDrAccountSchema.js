const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const registrationSchemaForDr = new Schema({
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
    joiningDate:{
        type: Date
    }
   
});

module.exports = mongoodb.model("DrAccount",registrationSchemaForDr);
///////////////////////////////////////////////
