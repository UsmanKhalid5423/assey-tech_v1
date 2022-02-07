/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const lab = require('../../controllers/admin/lab');
const validator = require("./../../validation/doctor/doctor")
const upload = require("../../middlewares/uploadImage");
const commonValidator = require("./../../validation/validator")

/*******************************************************/
// Defining Routes.
/*******************************************************/
/**
 * Controller: It is used for doctor signup.
 */
 router.route('/add/lab').post(authentication('admin'),lab.signUp);

 /**
  * Controller: It is used to add doctor profile.
  */
 router.route('/add/lab/:id/profile').post(upload.uploadimg.any(),authentication('admin'),commonValidator.path,lab.profile);
 
 /**
  * Controller: It is used to update doctor profile.
  */
 router.route('/update/lab/:id/profile').patch(upload.uploadimg.any(),authentication('admin'),commonValidator.path,lab.updateProfile);
 
 
 /**
  * Controller: It is used to get doctor details.
  */
router.route('/find/lab/:id').get(authentication('admin'),commonValidator.path, lab.find);
 
 /**
  * Controller: It is used to get doctor details.
  */
router.route('/view/labs').get(authentication('admin'), lab.fetch);


   /**
  * Controller: It is used to get doctor details.
  */
router.route('/remove/lab/:id').delete(authentication('admin'),commonValidator.path,lab.remove);



/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
