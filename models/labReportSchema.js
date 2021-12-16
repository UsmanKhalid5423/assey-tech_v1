const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const labReport = new Schema({
    email:{
        type: String,
        required:true
    },
    test_Name:{
        type: String,
        required:true
    },
    byDr:{
        type: String,
        required:true
    },
    reportStatus:{
        type: String,
        required:true
    },
    view:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
   
});

module.exports = mongoodb.model("labReport",labReport);