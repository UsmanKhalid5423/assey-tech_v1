/*******************************************************/
// Importing Files.
/*******************************************************/
const mongoose = require("./instance");

/*******************************************************/
// Syncing Database with Database Models.
/*******************************************************/
const databaseConnection = mongoose.instance();
const database = {
    mongoose: databaseConnection,
};

module.exports = database.mongoose;
