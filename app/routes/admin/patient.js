/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const patient = require('../../controllers/admin/patient');
const validator = require("./../../validation/doctor/doctor")
const upload = require("../../middlewares/uploadImage");
const commonValidator = require("./../../validation/validator")

/*******************************************************/
// Defining Routes.
/*******************************************************/

 /**
  * Controller: It is used to update doctor profile.
  */
  router.route('/add/patient/:id/profile').post(upload.uploadimg.any(),authentication('admin'),commonValidator.path,patient.profile);
 


 /**
  * Controller: It is used to update doctor profile.
  */
 router.route('/update/patient/:id/profile').patch(upload.uploadimg.any(),authentication('admin'),commonValidator.path,patient.updateProfile);
 
 
 /**
  * Controller: It is used to get doctor details.
  */
router.route('/find/patient/:id').get(authentication('admin'),commonValidator.path, patient.find);
 
 /**
  * Controller: It is used to get doctor details.
  */
router.route('/view/patients').get(authentication('admin'), patient.fetch);


   /**
  * Controller: It is used to get doctor details.
  */
router.route('/remove/patient/:id').delete(authentication('admin'),commonValidator.path,patient.remove);



/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
