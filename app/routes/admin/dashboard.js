/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const router = require('express').Router();
require('dotenv').config();

/*******************************************************/
// Importing Files.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/auth")

const dashboard = require('../../controllers/admin/dashboard');
const validator = require("./../../validation/doctor/doctor")
const upload = require("../../middlewares/uploadImage");
const commonValidator = require("./../../validation/validator")

/*******************************************************/
// Defining Routes.
/*******************************************************/
 
 /**
  * Controller: It is used to get doctor details.
  */
router.route('/view/dasboard-kpi').get(authentication('admin'), dashboard.kpi);


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
