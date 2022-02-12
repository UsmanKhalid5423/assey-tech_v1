/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../../utility/calls/databaseRequest");
const response = require("../../utility/function/response");
const models = require("../../../database/schema/instance");
const code = require("../../utility/function/code");
const nodeMailer = require("../../../utility/service/email");

//const response = require("../../utility/functions/response");
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
 * Controller: It is used create patient.
 */
 const kpi = async (req , res ,next) =>{
    try {

        const doctorsCount = await fetchCount(models.doctor,{})
        const patientsCount = await fetchCount(models.patient,{'isEmailVerified':true})
        const labsCount = await fetchCount(models.lab,{'isEmailVerified':true})

        let data = {
            doctorsCount,
            patientsCount,
            labsCount
        }
        return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", data);

    } catch (error) {
        let errorMessge;
        if (Number(error.code) === 11000) {
            if (error.errmsg.includes("contact.email"))
                errorMessge = "EMAIL_NOT_UNIQUE";
            else
                errorMessge = "MOBILE_NUMBER_NOT_UNIQUE";
            response.send(
                req,
                res,
                next,
                "warn",
                208,
                errorMessge,
                null
            );
        }
        else {
            return next({
                code: 500,
                message: "SERVER_ERROR",
                data: error
            });
        }
    }
};



/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    kpi
};



/**
 * Controller: It is manage doctor information.
 */
const fetchCount = async (model,query) => {
    return await database.count(model,query)
}
