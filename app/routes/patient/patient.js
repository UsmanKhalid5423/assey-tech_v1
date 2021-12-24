//npm modules
const router = require('express').Router();
require('dotenv').config();

//importing files

const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth");
const validator = require("../../validation/doctor/doctor")
const patient = require("../../controllers/patient/patient");
const upload = require("../../middlewares/uploadImage");

//routes
///Dr sighnUp Rote
router.route('/patientsignup').post(patient.signUp);
router.route('/patientlogin').post(patient.login);
/**
 * Controller: It is used to add doctor profile.
 */
 router.route('/add/profile').post(upload.uploadimg.any(),authentication('doctor'), patient.profile);
/**
 * Controller: It is used to update doctor profile.
 */
 router.route('/update/profile').patch(upload.uploadimg.any(),authentication('doctor'), patient.updateProfile);

/**
 * Controller: It is used to logout doctor.
 */
 router.route('/logout').post(authentication('doctor'), patient.logout);

/**
 * Controller: It is used to get doctor details.
 */
 router.route('/detail').get(authentication('doctor'), patient.find);




module.exports = router;