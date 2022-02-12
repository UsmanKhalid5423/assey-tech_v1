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
 * Controller: It is used create a test by doctor.
 */
const add = async (req, res, next) => {
    try {
        let result = await manageTest(req,new models.test() )
        // if not a doctor's patient than add, else update testCount

        const { patientId } = req.body;
        const { userId } = req

        

        let isDoctorPatient = await database.findBy(models.doctorPatient,{'patientId': patientId, doctorId: userId})

        if(isDoctorPatient)
        {
            isDoctorPatient.testCount += 1
            await database.save(isDoctorPatient)
        }
        else
        {
            let doctorPatient = new models.doctorPatient()
            doctorPatient.patientId = patientId
            doctorPatient.doctorId = userId
            doctorPatient.testCount = 1
            await database.save(doctorPatient)
        }
        
        return response.send(req, res, next, "info", 201, "SIGN_UP_COMPLETED", result);

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

/**
 * Controller: It is used by doctor to find a test detail.
 */
 const find = async (req,res,next)=>{

    try {
        const testId = req.params.id
        const result = await database.findById_v2(models.test,{'_id':testId})
        if(result)
        {
            let patientDetails = await database.findById_v2(models.patient,result.patientId)
            if(patientDetails)
            {
                let data={
                    testDetails : result,
                    patientDetails: patientDetails,
                }
                return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", data);
            }
            else
            {
                return response.send(
                    req,
                    res,
                    next,
                    "info",
                    202,
                    "DATA_NOT_AVAILABLE",
                    null
                );
            }
        }
        
        return response.send(
            req,
            res,
            next,
            "info",
            202,
            "DATA_NOT_AVAILABLE",
            null
        );
        
    }
    catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}


/**
 * Controller: It is used by doctor to fetch doctor all created tests.
 */
 const fetch = async (req,res,next)=>{

    try {
        const { userId } = req
        let query ={
            'doctorId' : userId
        }
        let testList = await database.fetch(models.test,query)
        return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", testList);
        
    }
    catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}


/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    add,
    find,
    fetch
};



/**
 * Controller: It is manage doctor information.
 */
const manageTest = async (req, test) => {
    
    const { patientId, labId, testName, date, testStatus } = req.body;
    //const { email, userId } = req.userEmail
    
    const { email, userId } = req


    //const doctorDetails = await database.findBy(models.doctor,{'email':email})

    test.patientId = patientId
    //test.doctorId = doctorDetails._id
    test.doctorId = userId

    test.labId = labId
    test.testName = testName
    test.date = date
    test.testStatus = testStatus

    return await database.save(test);
}

