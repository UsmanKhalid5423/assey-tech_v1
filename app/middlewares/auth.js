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
                 switch (type) {
                    case "doctor":
                        
                        data = await database.findBy(models.tokenSchema, { 'token': token } );
                        if(data)
                        {
                            result = await database.findBy(models.doctor,{'email' : data.email})
                        }
                        if(!result)
                        {
                            return next({
                                code: 403,
                                message: "UN_AUTHORIZED_USER",
                                data: null
                            })
                        }
                        break;
                    case "patient":
                    
                        data = await database.findBy(models.tokenSchema, { 'token': token } );
                        if(data)
                        {
                            result = await database.findBy(models.patient,{'email' : data.email})
                        }
                        if(!result)
                        {
                            return next({
                                code: 403,
                                message: "UN_AUTHORIZED_USER",
                                data: null
                            })
                        }
                        break;
                    case "lab":
                    
                        data = await database.findBy(models.tokenSchema, { 'token': token } );
                        if(data)
                        {
                            result = await database.findBy(models.lab,{'email' : data.email})
                        }
                        if(!result)
                        {
                            return next({
                                code: 403,
                                message: "UN_AUTHORIZED_USER",
                                data: null
                            })
                        }
                        break;
                    case "admin":
                
                        data = await database.findBy(models.tokenSchema, { 'token': token } );
                        if(data)
                        {
                            result = await database.findBy(models.admin,{'email' : data.email})
                        }
                        if(!result)
                        {
                            return next({
                                code: 403,
                                message: "UN_AUTHORIZED_USER",
                                data: null
                            })
                        }
                        break;
                }

                //data = await database.findBy(models.tokenSchema, { 'token': token } );
                if (data) {
                    req.userEmail = data.email
                    req.userId = result._id
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