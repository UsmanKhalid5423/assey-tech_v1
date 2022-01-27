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
 * Controller: It is used by doctor to find a test detail.
 */
 const find = async (req,res,next)=>{

    try {
        const testId = req.params.id
        // const result = await database.findById(models.test,testId)
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
            'patientId' : userId
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
            'patientId' : userId
        }
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

const add = async (req,res,next) => {
    try{
        const body = req.body
        const result = await models.patientTest.create(body)
        if (result) {
            return response.send(
                req,
                res,
                next,
                "info",
                200,
                "CREATED",
                result
            );
        }
        else {
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
    }catch(error){
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

