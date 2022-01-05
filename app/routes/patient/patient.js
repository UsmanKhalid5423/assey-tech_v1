//npm modules
const router = require('express').Router();
require('dotenv').config();

//importing files

const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth");
const validator = require("../../validation/patient/patient")
const patient = require("../../controllers/patient/patient");
const upload = require("../../middlewares/uploadImage");

//routes
///Dr sighnUp Rote
router.route('/signup').post(validator.add,patient.signUp);

/**
 * Controller: It is used to add doctor profile.
 */
 router.route('/verify/OTP').post(patient.verifyOTP);

 /**
 * Controller: It is used to add doctor profile.
 */
  router.route('/resend/OTP').post(patient.resendOTP);

router.route('/login').post(validator.login, patient.login);
/**
 * Controller: It is used to add doctor profile.
 */
 router.route('/add/profile').post(upload.uploadimg.any(),authentication('patient'),validator.profile,patient.profile);
/**
 * Controller: It is used to update doctor profile.
 */
 router.route('/update/profile').patch(upload.uploadimg.any(),authentication('patient'), validator.profile,patient.updateProfile);

/**
 * Controller: It is used to logout doctor.
 */
 router.route('/logout').post(authentication('patient'), patient.logout);

/**
 * Controller: It is used to get doctor details.
 */
 router.route('/detail').get(authentication('patient'), patient.find);




module.exports = router;