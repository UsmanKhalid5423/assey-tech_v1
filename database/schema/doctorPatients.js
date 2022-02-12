const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;


const doctorPatients = new Schema({
    patientId:{
        type: String,
        required:true
    },
    // doctorId:{
    //     type: String,
    //     doctorId:[
    //         {type: Schema.Types.ObjectId, ref: 'Ingredient'}
    //     ],
    //     required:true
    // },
    doctorId:{
            type: Schema.Types.ObjectId, ref: 'doctor'
    },
    testCount:{
        type: Number,
        required:true
    },
    // patientCount:{
    //     type: Number,
    //     required:true
    // },
   
});

module.exports = mongoodb.model("doctorPatients",doctorPatients);