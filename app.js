const express = require("express");
const app = express();
const mongoose = require("mongoose");


const url = "mongodb+srv://telemedicine:telemedicinePass123@tododatabase.j4rh6.mongodb.net/Telemedicine?retryWrites=true&w=majority";
mongoose.connect(url,{ useNewUrlParser: true }).then(()=>{
    console.log("Telemedicine Database Connected"); 
});

app.use(express.urlencoded({extended:false}));
app.use(express.json()); //For JSON Enable...
//app.use('/uploads', express.static('uploads'));



//////////////// For Routes ////////////
const routes = require("./route/routes");
app.use(routes);












app.listen(3000,"localhost",()=>{
    console.log("Port 3000 is Started");
});