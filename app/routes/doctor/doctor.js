/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
//const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/authentication/authentication")

const doctor = require('../../controllers/doctor/doctor');
const validator = require("./../../validation/doctor/doctor")
/*******************************************************/
// Defining Routes.
/*******************************************************/

router.route('/signup').post(validator.add,doctor.signUp);

router.route('/login').post(doctor.login);



/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
