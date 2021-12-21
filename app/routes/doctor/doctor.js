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

/*******************************************************/
// Defining Routes.
/*******************************************************/

router.route('/signup').post(doctor.signUp);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
