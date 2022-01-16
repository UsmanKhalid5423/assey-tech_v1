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


        
        return response.send(req, res, next, "info", 201, "SIGN_UP_COMPLETED", result);

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
};



