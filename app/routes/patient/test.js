/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const test = require('../../controllers/patient/test');
const validator = require("./../../validation/doctor/doctor")
const commonValidator = require("./../../validation/validator")
const upload = require("../../middlewares/uploadImage");
/*******************************************************/
// Defining Routes.
/*******************************************************/


/**
 * Controller: It is used by doctor to find a test
 */
 router.route('/find/test/:id').get(authentication('patient'),commonValidator.path,test.find);


 /**
 * Controller: It is used by doctor to fetch test
 */
  router.route('/view/test').get(authentication('patient'), test.fetch);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
