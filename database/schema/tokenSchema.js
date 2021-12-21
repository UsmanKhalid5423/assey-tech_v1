const mongoodb = require("mongoose");
const Schema = mongoodb.Schema;

const tokenSchema = new Schema({
   
    token:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    }
    
});


module.exports = mongoodb.model("token",tokenSchema);