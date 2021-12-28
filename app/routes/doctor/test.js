/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const test = require('../../controllers/doctor/test');
const validator = require("./../../validation/doctor/test")
const commonValidator = require("./../../validation/validator")
const upload = require("../../middlewares/uploadImage");
/*******************************************************/
// Defining Routes.
/*******************************************************/

/**
 * Controller: It is used by doctor to add a test
 */
router.route('/add/test').post(authentication('doctor'),validator.add, test.add);


/**
 * Controller: It is used by doctor to find a test
 */
 router.route('/find/test/:id').get(authentication('doctor'),commonValidator.path,test.find);


 /**
 * Controller: It is used by doctor to fetch test
 */
  router.route('/view/test').get(authentication('doctor'), test.fetch);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
