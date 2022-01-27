/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../../utility/calls/databaseRequest");
const response = require("../../utility/function/response");
const models = require("../../../database/schema/instance");
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const moment = require("moment");
const bcrypt = require("../../utility/function/bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*******************************************************/
//Main Controllers.
/*******************************************************/

/**
 * Controller: It is used create admin.
 */
const dashboardKpi = async (req, res, next) => {
    try {
        const email = req.userEmail
        const doctorDetails = await database.findBy(models.doctor,{ 'email': email });
        return response.send(req, res, next, "info", 201, "DASHBOARD FETCH", result);

    } catch (error) {
       
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};

// lATEST TESTS

const latestTestsKpi = async (req, res, next) => {
    try {
        const date = new Date();
        var dateOffset = (24*60*60*1000) * 5; //5 days
        let d = new Date();
        let sevenDaysFromNow = d.setDate(d.getDate() -1);
        sevenDaysFromNow = new Date(sevenDaysFromNow).toISOString();
        console.log(sevenDaysFromNow)
        const tests = await models.patientTest.find({$gte:{createdAt : sevenDaysFromNow}})
        // console.log('me tests by query',tests)
        // const testDetails = await models.patientTest.aggregate([{$match:{createdAt:{$gte:'2022-01-25T11:30:28.901'}}}])
        return response.send(req, res, next, "info", 201, "LATEST TESTS FETCHED", tests);

    } catch (error) {
       
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};

/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    dashboardKpi,
    latestTestsKpi
};



