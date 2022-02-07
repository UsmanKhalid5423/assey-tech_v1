/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const doctor = require('../../controllers/doctor/doctor');
const validator = require("./../../validation/doctor/doctor")
const upload = require("../../middlewares/uploadImage");
/*******************************************************/
// Defining Routes.
/*******************************************************/

/**
 * Controller: It is used for doctor signup.
 */
router.route('/signup').post(validator.add,doctor.signUp);

/**
 * Controller: It is used for doctor login.
 */
router.route('/login').post(doctor.login);

/**
 * Controller: It is used to add doctor profile.
 */
 router.route('/verify/OTP').post(doctor.verifyOTP);

 /**
 * Controller: It is used to add doctor profile.
 */
   router.route('/resend/OTP').post(doctor.resendOTP);

   /**
 * Controller: It is used to add doctor profile.
 */
router.route('/add/profile').post(upload.uploadimg.any(),authentication('doctor'), doctor.profile);

/**
 * Controller: It is used to update doctor profile.
 */
router.route('/update/profile').patch(upload.uploadimg.any(),authentication('doctor'), doctor.updateProfile);


/**
 * Controller: It is used to get doctor details.
 */
 router.route('/detail').get(authentication('doctor'), doctor.find);


/**
 * Controller: It is used to logout doctor.
 */
router.route('/logout').post(authentication('doctor'), doctor.logout);

/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
