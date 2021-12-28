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
 * Controller: It is used by doctor to fetch doctor all created tests.
 */
 const fetch = async (req,res,next)=>{

    try {
       
        let query ={ }
        const { search } = req.query;
        if (search)
        {
            //query = { 'lab_name': { $regex: search, $options: "i" } };
            query['full_name'] = { $regex: search, $options: "i" }
        }
        let labList = await database.fetch(models.patient,query)
        return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", labList);

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


/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    fetch
};

