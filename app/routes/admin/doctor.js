/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const doctor = require('../../controllers/admin/doctor');
const validator = require("./../../validation/doctor/doctor")
const upload = require("../../middlewares/uploadImage");
const commonValidator = require("./../../validation/validator")

/*******************************************************/
// Defining Routes.
/*******************************************************/
/**
 * Controller: It is used for doctor signup.
 */
 router.route('/add/doctor').post(validator.add,doctor.signUp);

 /**
  * Controller: It is used to add doctor profile.
  */
 router.route('/add/doctor/:id/profile').post(upload.uploadimg.any(),authentication('admin'),doctor.profile);
 
 /**
  * Controller: It is used to update doctor profile.
  */
 router.route('/update/doctor/:id/profile').patch(upload.uploadimg.any(),authentication('admin'),doctor.updateProfile);
 
 
 /**
  * Controller: It is used to get doctor details.
  */
router.route('/find/doctor/:id').get(authentication('admin'),commonValidator.path, doctor.find);
 
 /**
  * Controller: It is used to get doctor details.
  */
  router.route('/view/doctor').get(authentication('admin'), doctor.fetch);


   /**
  * Controller: It is used to get doctor details.
  */
    router.route('/remove/doctor/:id').delete(authentication('admin'),commonValidator.path,doctor.remove);



/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
