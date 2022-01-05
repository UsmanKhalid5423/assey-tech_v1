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
let ejs = require("ejs");
const fs = require('fs')
let pdf = require("html-pdf");

require("dotenv").config();

/*******************************************************/
//Main Controllers.
/*******************************************************/

/**
 * Controller: It is used create a test by doctor.
 */
const add = async (req, res, next) => {
    try {
        let testId = req.params.id
       
        let testDetails = await database.findBy(models.test,{'_id': testId})
        if(testDetails)
        {
            const { result, testStatus } = req.body
            testDetails.result = result
            testDetails.testStatus = testStatus
            let data = await database.save(testDetails)

            if(testStatus=='completed')
            {
                await createResultPdf(data);
            }




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


const createResultPdf = async (data)=>{
    const patientDetails = await database.findBy(models.patient,{'_id':data.patientId});
    const testName = data.testName
    const testDate = moment(data.date).format('YYYY-MM-DD')
    const testResult = data.result
    const labDetails = await database.findBy(models.lab,{'_id':data.labId});
   await generatePdf(patientDetails.full_name,labDetails.lab_name,testName,testDate,testResult);
}



const generatePdf = async (patientName,labName,testName,testDate,testResult) => {

      await ejs.renderFile('./views/report.ejs',{ patientName:patientName,labName:labName,testName:testName,testDate:testDate,testResult:testResult}, (err, data) => {  
        if (err) {
            console.log("err while crearing html");
            console.log(err);
            return next({ code: 500, message: "SERVER_ERROR", data: error });
        } else {

            //invoiceData = data;

            let options = {
                "format": "A2",
                "orientation": "portrait",
                //"quality": "75",
            };

           // pdf.create(data, options).toFile("./uploads/childInvoice/"+fileName+".pdf", async function (err, data) {
            pdf.create(data, options).toFile("result.pdf", async function (err, data) {
                if (err) {
                    console.log("err while crearing pdf");
                    console.log(err);
                    //return next({ code: 500, message: "SERVER_ERROR", data: error });
                } else {
                    console.log("FIle CREATED");

                    let baseUrl, directory
                    // switch (process.env.ENV) {
                    //     case "development":
                    //         baseUrl = 'https://sdn-staging.s3.eu-west-2.amazonaws.com'
                    //         directory = "/invoiceDevelop";
                    //         break;
                    //     case "staging":
                    //         baseUrl = 'https://sdn-staging.s3.eu-west-2.amazonaws.com'
                    //         directory = "/invoiceStaging";
                    //         break;
                    //     case "production":
                    //         baseUrl = 'https://sdn-staging.s3.eu-west-2.amazonaws.com'
                    //         directory = "/invoiceProduction";
                    //         break;
                    // }

                    

                    //url = baseUrl + directory + '/' + fileName +'.pdf'
                    //invoiceDetail.invoiceDownloadUrl = url
                    //await database.save(invoiceDetail)

                    //await uploadpdf(fileName,directory);
                    
                }
            });


        }
    });
   
    // invoiceDetail.invoiceDownloadUrl = url
    // await database.save(invoiceDetail)
    //return url;
}




