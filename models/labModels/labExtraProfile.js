const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;

const exrtaProfileLab = new Schema({
    _id:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    licNumber:{
        type: String,
        required:true
    },
    
    // image:{
    //     type: String,
    //     get:(images)=>{ return `${appurl}/${images}`; }
    } 
// }
);

module.exports = mongoodb.model("LabExrtaProfile",exrtaProfileLab);