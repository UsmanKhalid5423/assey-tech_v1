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
        url = "mongodb+srv://telemedicine:telemedicinePass123@tododatabase.j4rh6.mongodb.net/Telemedicine?retryWrites=true&w=majority";
        break;
    case "production":
        url = ""
        break;
}
console.log("The url is ", url);
// module.exports.instance = function () {
//     mongoClient.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//     }, function (error, db) {
//         if (error) {
//             console.log("Error while connecting", error);
//             throw error;
//         }
//         else {
//             console.log("Database Connection Established");
//             // db.close();

//             // console.log(db.isConnected());
//         }
//     });
// };


module.exports.instance = function () {
mongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) throw err
    console.log("Telemedicine Database Connected");
});
}