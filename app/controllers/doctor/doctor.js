/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../../utility/calls/databaseRequest");
const response = require("../../utility/function/response");
const models = require("../../../database/schema/instance");
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
 * Controller: It is used create admin.
 */
const signUp = async (req, res, next) => {
    try {
        let result = await manageDoctor(req,new models.doctor() )
        delete result.password;
        response.send(req, res, next, "info", 201, "SIGN_UP_COMPLETED", result);

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
 * Controller: It is used to login.
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //const user = await database.findBy(models.registrationSchemaForDr,{ 'email': email });
        
        const user = await database.findBy(models.doctor,{ 'email': email });
        
        if (user) {
            const comparingPasswords = await bcrypt.comparsion(password, user.password);
            if (comparingPasswords) {
                
                const userToken = await models.tokenSchema.findOne({ email });
                if (userToken) {
                    //return res.status(501).json(`The User : ${process.env.user} is already Login`);
                    return response.send(
                        req,
                        res,
                        next,
                        "info",
                        202,
                        "ALREADY_LOGGED_IN",
                        null
                    );
                }

                else {
                    const token = await jwt.sign({ id: user._id }, "goodwork", { expiresIn: "1y", });
                    const data = await models.tokenSchema.create({
                        token: token,
                        email: email,
                    });
                    return response.send(
                        req,
                        res,
                        next,
                        "info",
                        200,
                        "LOGGED_IN",
                        data
                    );
                    //return res.status(501).json(`The User is Login, Email: ${process.env.user}`);
                }
                
                // const authToken = await jwtToken.generatingToken(
                //     {
                //         id: user.id,
                //         email: user.email
                //     },
                //     true,
                //     0
                // );
                // await database.update(models.admin, { "_id": user._id }, { "$push": { "tokens": String(authToken) } });
                // const data = {
                //     user: user.toJson(),
                //     token: authToken
                // }
                // return response.send(
                //     req,
                //     res,
                //     next,
                //     "info",
                //     200,
                //     "LOGGED_IN",
                //     user
                // );
            }
            else {
                return next({
                    code: 401,
                    message: "AUTHORIZATION_FAILED",
                    data: null
                });
            }
        }
        return next({
            code: 401,
            message: "AUTHORIZATION_FAILED",
            data: null
        });
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
};


/**
 * Controller: It is used to logout user.
 */
const logout = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization
        let result = await models.tokenSchema.findOneAndDelete({token: authToken})
        if (result) {
            return response.send(
                req,
                res,
                next,
                "info",
                200,
                "LOGGED_OUT",
                null
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
    } catch (error) {
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
    signUp,
    login,
    logout
};




const manageDoctor = async (req, doctor) => {
    
    const { fullName, email,age,phoneNumber, password } = req.body;
    const encryptedPassword =  await bcrypt.encryption(password);

    doctor.full_name = fullName
    doctor.email = email
    doctor.age = age
    doctor.phone_number = phoneNumber
    doctor.password = encryptedPassword
    
    //return doctor;
    
    return await database.save(doctor);
}



