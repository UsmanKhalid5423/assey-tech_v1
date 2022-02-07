/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const admin = require('../../controllers/admin/admin');
const validator = require("./../../validation/doctor/doctor")
const upload = require("../../middlewares/uploadImage");
/*******************************************************/
// Defining Routes.
/*******************************************************/

/**
 * Controller: It is used for doctor signup.
 */
router.route('/signup').post(admin.signUp);

/**
 * Controller: It is used for doctor login.
 */
router.route('/login').post(admin.login);


/**
 * Controller: It is used to logout doctor.
 */
router.route('/logout').post(admin.logout);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
