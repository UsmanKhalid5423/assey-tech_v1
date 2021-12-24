'use strict';
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
// const fs = require('fs');
// const path = require('path');
// const mongoose = require('mongoose');

// /*******************************************************/
// // Configuring Instance.
// /*******************************************************/
// const basename = path.basename(__filename);
// const Schema = mongoose.Schema;
// const db = {};

// /*******************************************************/
// // Importing all model files.
// /*******************************************************/
// fs.readdirSync(__dirname).filter(fileName => {
//     return (
//         fileName.indexOf('.') !== 0)
//         && (fileName !== basename)
//         && (fileName.slice(-3) === '.js'
//         );
// })
//     .forEach(fileName => {
//         const model = require(path.join(__dirname, fileName));
//         const modelSchema = new Schema (model.schema, {strict: false});
//         modelSchema.methods = model.methods;
//         modelSchema.statics = model.statics;
//         fileName = fileName.split('.')[0];
//         db[fileName] = mongoose.model(fileName, modelSchema);
//     });

//     console.log(' ===== >> DB === >> ',db)


/*******************************************************/
// Importing models.
/*******************************************************/

const database = {
	//registrationSchemaForDr: require("./userDrAccountSchema"),
	doctor: require("./userDrAccountSchema"),
	tokenSchema: require("./tokenSchema"),
	doctorProfile: require("./drExtraProfile"),
	patient: require("./userAccountSchema"),
	patientProfile: require("./patientModels/patientExtraProfileSchema"),
}
//  const patient_database = {
	
//  }

//module.exports = db;

module.exports = database;
// module.exports = patient_database;




//module.exports = db;
