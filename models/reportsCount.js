const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const reportCount = new Schema({
    email:{
        type: String,
        required:true
    },
    count:{
        type: String,
        required:true
    },
   
});

module.exports = mongoodb.model("reportCount",reportCount);