/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const patient = require('../../controllers/doctor/patient');
const validator = require("./../../validation/doctor/test")
const commonValidator = require("./../../validation/validator")
const upload = require("../../middlewares/uploadImage");
/*******************************************************/
// Defining Routes.
/*******************************************************/

 /**
 * Controller: It is used by doctor to fetch test
 */
  router.route('/view/patient').get(authentication('doctor'), patient.fetch);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
