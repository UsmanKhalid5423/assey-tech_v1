const router = require('express').Router();
require('dotenv').config();
/*******************************************************/
// Defining Routes.
/*******************************************************/
const authentication = (process.env.ENV === "testing") ? require("../../middlewares/authentication/authenticationTest") : require("../middlewares/auth")
const dashboardController = require('../controllers/doctor/dashboard')

router.route('/kpi').get(dashboardController.dashboardKpi)

router.route('/latest-tests').get(dashboardController.latestTestsKpi)


/*******************************************************/
// Exporting Routes.
/*******************************************************/
module.exports = router;
