const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const test = new Schema({
    patientId:{
        type: String,
        required:true
    },
    doctorId:{
        type: String,
        required:false
    },
    labId:{
        type: String,
        required:true
    },
    testName:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    testStatus:{
        type: String,
        enum: ['labworkOrdered','labworkComplete','sampleSent', 'completed']
    },
    result:{
        type: String,
        //required:true
    },
    
   
});

module.exports = mongoodb.model("test",test);