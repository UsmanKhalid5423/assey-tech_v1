/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const test = require('../../controllers/lab/test');
const validator = require("./../../validation/lab/test")
const commonValidator = require("./../../validation/validator")
const upload = require("../../middlewares/uploadImage");
/*******************************************************/
// Defining Routes.
/*******************************************************/

/**
 * Controller: It is used by doctor to add a test
 */
router.route('/add/test/:id/result').post(authentication('lab'),commonValidator.path,validator.add,test.add);


/**
 * Controller: It is used by doctor to find a test
 */
 router.route('/find/test/:id').get(authentication('lab'),commonValidator.path, test.find);


 /**
 * Controller: It is used by doctor to fetch test
 */
  router.route('/view/test').get(authentication('lab'), test.fetch);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
