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
        let testId = req.id

        let testDetails = await database.findById(models.test,testId)

        if(testDetails)
        {
            const { result, testStatus } = req.body
            testDetails.result = result
            testDetails.testStatus = testStatus
            let data = await database.save(result)
            return response.send(req, res, next, "info", 201, "RESULT_ADDED", data);
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
        const result = await database.findById_v2(models.test,testId)
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
 const fetch_old = async (req,res,next)=>{

    try {
        const { userId } = req
        let query ={
            'labId' : userId
        }
        let testList = await database.fetch(models.test,query)
        return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", testList);
        
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
            'labId' : userId
        }


        // const result = await models.test.aggregate([
        //     { $lookup:
        //     {
        //         from: 'account',
        //         localField: 'patientId',
        //         foreignField: 'patientId',
        //         as: 'patientDetail'
        //     }
        //     }
        //     ])
        // console.log('=========>> result === >> ',result)


        // const result1 = await models.test.aggregate([
        //     { $lookup:
        //     {
        //         from: 'registrationSchema',
        //         localField: 'patientId',
        //         foreignField: 'patientId',
        //         as: 'patientDetail'
        //     }
        //     }
        //     ])
        // console.log('+++++++++++++++>> result1 +++++++++++++ >> ',result1)


        // const result2 = await models.test.aggregate([
        //     { $lookup:
        //     {
        //         from: 'patient',
        //         localField: 'patientId',
        //         foreignField: 'patientId',
        //         as: 'patientDetail'
        //     }
        //     }
        //     ])
        // console.log('=========>> result2 === >> ',result2)


        let testList = await database.fetch(models.test,query)

        let result = []

        for(let i=0;i<testList.length;i++)
        {
            let pateintDetails = await database.findById_v2(models.patient,testList[i].patientId)
            result.push({
                testDetails : testList[i],
                pateintDetails: pateintDetails
            })
        }

        return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", result);

       // return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", testList);
        
        
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

