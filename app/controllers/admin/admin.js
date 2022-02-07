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
 * Controller: It is used create admin.
 */
const signUp = async (req, res, next) => {
    try {
        const isUnique = await isDataUnique(req);
        if(!isUnique)
        {
            return response.send(req, res, next, "info", 208, "ALREADY_EXISTS", null);
        }
        let result = await manageAdmin(req,new models.admin() )
        delete result.password;
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
 * Controller: It is used to login.
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await database.findBy(models.admin,{ 'email': email });
        
        if (user) {
            const comparingPasswords = await bcrypt.comparsion(password, user.password);
            if (comparingPasswords) {
                
                await models.tokenSchema.findOneAndDelete({email: email})

                const token = await jwt.sign({ id: user._id }, "goodwork", { expiresIn: "1y", });
                const data = await models.tokenSchema.create({
                    token: token,
                    email: email,
                });
                let result = {
                    data,
                    userType: 'admin'
                }
                return response.send(
                    req,
                    res,
                    next,
                    "info",
                    200,
                    "LOGGED_IN",
                    result
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
 * Controller: It is used to logout user.
 */
const logout = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization
        let result = await models.tokenSchema.findOneAndDelete({token: authToken})
        console.log(result);
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



/**
 * Controller: It is manage doctor information.
 */
const manageAdmin = async (req, admin) => {
    
    const { email,password,fullName } = req.body;
    const encryptedPassword =  await bcrypt.encryption(password);

    admin.fullName = fullName
    admin.email = email
    admin.password = encryptedPassword
    
    //return doctor;
    
    return await database.save(admin);
}


const manageDoctor_v2 = async (req, doctor) => {
    
    const { fullName, email,age,phoneNumber } = req.body;
    doctor.full_name = fullName
    doctor.email = email
    doctor.age = age
    doctor.phone_number = phoneNumber
    return await database.save(doctor);
}


/**
 * Controller: It is manage doctor profile/extra information.
 */
const manageDoctorProfile = async (req, doctorProfile,doctorId) => {
    
    const { gender, dateOfBirth,licenseExpiryDate,address,license } = req.body;
    doctorProfile._id = doctorId
    doctorProfile.gender = gender
    doctorProfile.dateOfBirth = dateOfBirth
    doctorProfile.licenseExpiryDate = licenseExpiryDate
    doctorProfile.license = license

    doctorProfile.address = address
    doctorProfile.image = req.files.length>0 ? req.files[0].filename : doctorProfile.image
    return await database.save(doctorProfile);
}


/**
 * Controller: It is used check is email already exist.
 */
 const isDataUnique = async (req) => {
    const {email} = req.body
    let result = await database.findBy(models.admin,{'email':email})
    if(result)
        return false
    return true
}


