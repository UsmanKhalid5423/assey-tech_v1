/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require('../utility/calls/databaseRequest');
const models = require('../../database/schema/instance');

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const jwt = require("jsonwebtoken");
require("dotenv").config();

/*******************************************************/
//Main Controllers. 
/*******************************************************/
module.exports = function (type) {
    return async function (req, res, next) {
        try {
            let token;
            if (req.headers.authorization.includes("Bearer"))
                token = req.headers.authorization.split(" ")[1]
            else
                token = req.headers.authorization;

            if(token)
            {
                // no need of type, because we have only 1 table for token
                //  switch (type) {
                //     case "doctor":
                //         data = await database.findBy(models.tokenSchema, { 'token': token } );
                //         break;
                // }

                data = await database.findBy(models.tokenSchema, { 'token': token } );
                if (data) {
                    req.userEmail = data.email
                    return next()
                }
                else {
                    return next({
                        code: 403,
                        message: "UN_AUTHORIZED_USER",
                        data: null
                    })
                }
            }
            else
            {
                return next({
                    code: 403,
                    message: "UN_AUTHORIZED_USER",
                    data: null
                })
            }
        }
        catch (error) {
            console.log(error);
            return next({
                code: 403,
                message: "UN_AUTHORIZED_USER",
                data: null
            })
        }
    };
};