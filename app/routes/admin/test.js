/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const test = require('../../controllers/admin/test');
const validator = require("./../../validation/doctor/doctor")
const upload = require("../../middlewares/uploadImage");
const commonValidator = require("./../../validation/validator")

/*******************************************************/
// Defining Routes.
/*******************************************************/

 /**
  * Controller: It is used to update doctor profile.
  */
 router.route('/add/test/:id/result').patch(authentication('admin'),commonValidator.path,test.add);
 


/**
 * Controller: It is used by doctor to find a test
 */
 router.route('/find/test/:id').get(authentication('admin'),commonValidator.path, test.find);


 /**
 * Controller: It is used by doctor to fetch test
 */
  router.route('/view/tests').get(authentication('admin'), test.fetch);

   /**
  * Controller: It is used to get doctor details.
  */
router.route('/remove/test/:id').delete(authentication('admin'),commonValidator.path,test.remove);



/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
