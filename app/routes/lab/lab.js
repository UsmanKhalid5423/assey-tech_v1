/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const lab = require('../../controllers/lab/lab');
const validator = require("./../../validation/lab/lab")
const upload = require("../../middlewares/uploadImage");
/*******************************************************/
// Defining Routes.
/*******************************************************/

/**
 * Controller: It is used for lab signup.
 */
router.route('/signup').post(validator.add,lab.signUp);

/**
 * Controller: It is used to add doctor profile.
 */
 router.route('/verify/OTP').post(lab.verifyOTP);

 /**
 * Controller: It is used to add doctor profile.
 */
  router.route('/resend/OTP').post(lab.resendOTP);


/**
 * Controller: It is used for lab login.
 */
router.route('/login').post(validator.login, lab.login);

/**
 * Controller: It is used to add lab profile.
 */
router.route('/add/profile').post(upload.uploadimg.any(),authentication('lab'),validator.profile,lab.profile);

/**
 * Controller: It is used to update lab profile.
 */
router.route('/update/profile').patch(upload.uploadimg.any(),authentication('lab'),validator.profile, lab.updateProfile);


/**
 * Controller: It is used to get lab details.
 */
 router.route('/detail').get(authentication('lab'), lab.find);


/**
 * Controller: It is used to logout.
 */
router.route('/logout').post(authentication('lab'), lab.logout);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
