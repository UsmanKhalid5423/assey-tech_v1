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
require("dotenv").config();

/*******************************************************/
//Main Controllers.
/*******************************************************/

/**
 * Controller: It is used create admin.
 */
const signUp = async (req, res, next) => {
    try {
        let result = await manageDoctor(req,new models.registrationSchemaForDr() )
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
        let query ={
            where:{
                email: email
            }
        }
        const user = await database.findBy(models.registrationSchemaForDr,{ 'email': email });
        if (user) {
            //const comparingPasswords = await bcrypt.comparsion(password, user.password);
            if (user) {
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
                return response.send(
                    req,
                    res,
                    next,
                    "info",
                    200,
                    "LOGGED_IN",
                    user
                );
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
 * Controller: It is used to fetch profile.
 */
const fetch = async (req, res, next) => {
    try {
        response.send(req, res, next, "info", 200, "PROFILE_FETCHED", req.user.toJson());
    } catch (error) {
        return next({
            code: 500,
            message: "SERVER_ERROR",
            data: error
        });
    }
}

/**
* Controller: It is used to update the profile .
*/
const update = async (req, res, next) => {
    try {
        const { firstName, lastName, password } = req.body;
        let encryptedPassword;
        if (password)
            encryptedPassword = await bcrypt.encryption(password);
        else
            encryptedPassword = req.user.password;

        let adminInformation = {
            name: {
                firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
                lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()
            },
            password: encryptedPassword,
            updatedAt: moment().unix()
        };
        adminInformation["contact"] = req.user.contact;
        await database.update(models.admin, { "_id": req.user._id }, adminInformation);
        let data = { ...adminInformation };
        delete data.password;
        response.send(req, res, next, "info", 200, "PROFILE_UPDATED", data);
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
        let result = await database.update(models.admin, { "_id": req.user._id }, { "$pull": { "tokens": String(authToken) } });
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
                200,
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
    fetch,
    update,
    logout
};




const manageDoctor = async (req, doctor) => {
    
    const { fullName, email,age,phoneNumber, password } = req.body;
    const encryptedPassword = await bcrypt.encryption(password);

    doctor.full_name = fullName
    doctor.email = email
    doctor.age = age
    doctor.phone_number = phoneNumber
    doctor.password = encryptedPassword
    
    //return doctor;
    
    return await database.save(doctor);
}



