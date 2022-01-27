/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const mongoClient = require('mongoose');
require('dotenv').config();

/*******************************************************/
// Exporting Database Connection.
/*******************************************************/
let url;
switch (process.env.ENV) {
    case "development":
        url = ""
        break;
    case "staging":
        // url = "mongodb+srv://telemedicine:telemedicinePass123@tododatabase.j4rh6.mongodb.net/Telemedicine?retryWrites=true&w=majority";
        url = "mongodb://mongodbatlas:mongodbatlas@cluster0-shard-00-00.2cpe0.mongodb.net:27017,cluster0-shard-00-01.2cpe0.mongodb.net:27017,cluster0-shard-00-02.2cpe0.mongodb.net:27017/TelemedicineDB?authSource=admin&replicaSet=atlas-2mt9d9-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";
        break;
    case "production":
        url = ""
        break;
}
// console.log("The url is ", url);


module.exports.instance = function () {
mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) throw err;
    console.log("Telemedicine Database Connected");
});
}