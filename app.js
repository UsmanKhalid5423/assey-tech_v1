const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path')
const routes = require("./route/routes");


const url = "mongodb+srv://telemedicine:telemedicinePass123@tododatabase.j4rh6.mongodb.net/Telemedicine?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) throw err
    console.log("Telemedicine Database Connected");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //For JSON Enable...
//app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



//////////////// For Routes ////////////
app.use(routes);












app.listen(3000, "localhost", () => {
    console.log("Port 3000 is Started");
});