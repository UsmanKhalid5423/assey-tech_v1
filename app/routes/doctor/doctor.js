/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const doctor = require('../../controllers/doctor/doctor');
const validator = require("./../../validation/doctor/doctor")
/*******************************************************/
// Defining Routes.
/*******************************************************/

router.route('/signup').post(validator.add,doctor.signUp);

router.route('/login').post(doctor.login);

router.route('/logout').post(authentication('doctor'), doctor.logout);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
