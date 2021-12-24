/*******************************************************/
// Assigning Endpoints to the Routes.
/*******************************************************/
module.exports = function (app) {
    app.use('/api/v1/assay/doctor', require('./doctor/doctor'));
    app.use('/api/v1/assay/patient', require('./patient/patient'));
   }


// /*******************************************************/
// // Importing Npm Modules.
// /*******************************************************/
// const router = require('express').Router();
// require('dotenv').config();

// /*******************************************************/
// // Importing Files.
// /*******************************************************/
// //const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../../middlewares/authentication/authentication")

// const doctor = require('../controllers/doctor/doctor');

// /*******************************************************/
// // Defining Routes.
// /*******************************************************/

// router.route('/signup').post(doctor.signUp);


// /*******************************************************/
// // Exporting Routes.
// /*******************************************************/
// module.exports = router;




