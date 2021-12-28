/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const lab = require('../../controllers/doctor/lab');
const validator = require("./../../validation/doctor/test")
const commonValidator = require("./../../validation/validator")
const upload = require("../../middlewares/uploadImage");
/*******************************************************/
// Defining Routes.
/*******************************************************/

 /**
 * Controller: It is used by doctor to fetch test
 */
  router.route('/view/lab').get(authentication('doctor'), lab.fetch);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
