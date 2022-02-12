'use strict';

/*******************************************************/
// Configuring Instance.
/*******************************************************/

const database = {
	//registrationSchemaForDr: require("./userDrAccountSchema"),
	doctor: require("./userDrAccountSchema"),
	tokenSchema: require("./tokenSchema"),
	doctorProfile: require("./drExtraProfile"),
	lab: require("./userLabAccountSchema"),
	labProfile: require("./labModels/labExtraProfile"),
	patient: require("./userAccountSchema"),
	patientProfile: require("./patientModels/patientExtraProfileSchema"),
	test: require("./test"),
	patientTest: require("./patientModels/patientTestOrderSchema"),
	admin: require("./admin"),
	doctorPatient: require("./doctorPatients"),

}

module.exports = database;
