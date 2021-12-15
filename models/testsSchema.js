const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const tests = new Schema({
    test_name:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
   
});

module.exports = mongoodb.model("test",tests);