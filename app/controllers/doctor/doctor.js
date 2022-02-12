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
const nodeMailer = require("../../../utility/service/email");
const code = require("../../utility/function/code");
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
        let result = await manageDoctor(req,new models.doctor() )
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
        //const user = await database.findBy(models.registrationSchemaForDr,{ 'email': email });
        
        const user = await database.findBy(models.doctor,{ 'email': email });
        
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
                    userType: 'doctor'
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

const verifyOTP = async (req , res ,next) =>{
    try {

        const {email,OTP} = req.body

        console.log('==== >>> email == >>> ',email)
        
        const user = await database.findBy(models.doctor,{ 'email': email });
        console.log('==== >>> user == >>> ',user)
        if(user)
        {
            if(user.OTP==OTP)
            {
                user.isEmailVerified = true
                user.joiningDate = moment().format('YYYY-MM-DD')
                await database.save(user)
                delete user.OTP
                delete user.isEmailVerified
                delete user.password
                return response.send(req, res, next, "info", 200, "SIGN_UP_COMPLETED", user);
            }
            else
            {
                return response.send(req, res, next, "info", 208, "INCORRECT_OTP", null);
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

        //return response.send(req, res, next, "info", 201, "SIGN_UP_COMPLETED", result);
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

const resendOTP = async (req , res ,next) =>{
    try {

        const {email} = req.body
        const user = await database.findBy(models.doctor,{ 'email': email });
        if(user)
        {
            const OTP = code.otpCode();
            let emailBody = `This is your one time OTP password. Use this password to complete signup process.<br>
                        ${OTP}
                        <br>Please don't share it with anyone.`

            nodeMailer.dispatchEmail_v3("OTP Password", emailBody,email);
            user.OTP = OTP;
            await database.save(user)
            return response.send(req, res, next, "info", 200, "VERIFY_EMAIL", user);
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
 * Controller: It is used by doctor to add/update profile.
 */
const profile = async (req,res,next)=>{
    try {
        const email = req.userEmail
        const reqEmail = req.body.email
        if(email!=reqEmail)
        {
            const isUnique = await isDataUnique(req);
            if(!isUnique)
            {
                return response.send(req, res, next, "info", 208, "ALREADY_EXISTS", null);
            }
        }
        const doctorDetails = await database.findBy(models.doctor,{ 'email': email });
        if(doctorDetails)
        {
            const doctorId = doctorDetails._id;
            const doctorProfiledetails = await database.findBy(models.doctorProfile,{ '_id': doctorId });
            if(doctorProfiledetails)
            {
                return response.send(req, res, next, "info", 208, "PROFILE_ALREADY_EXISTS", doctorProfiledetails);
            }
            let doctor = await manageDoctor(req,doctorDetails);
            let  doctorProfile = new models.doctorProfile()
            let profile = await manageDoctorProfile(req,doctorProfile,doctorId)

            let token = req.headers.authorization; 
            let tokenUser = await database.findBy(models.tokenSchema, { 'token': token } );
            tokenUser.email = doctor.email
            await database.save(tokenUser)

            let data={
                doctorDetails: doctor,
                doctorProfileDetails: profile
            }
            return response.send(req, res, next, "info", 201, "PROFILE_ADDED", data);
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
 * Controller: It is used by doctor to add/update profile.
 */
 const updateProfile = async (req,res,next)=>{

    try {
        const email = req.userEmail
        const reqEmail = req.body.email
        if(email!=reqEmail)
        {
            const isUnique = await isDataUnique(req);
            if(!isUnique)
            {
                return response.send(req, res, next, "info", 208, "ALREADY_EXISTS", null);
            }
        }
        let doctorProfile;
        let doctorId;
        const doctorDetails = await database.findBy(models.doctor,{ 'email': email });
        if(doctorDetails)
        {
            doctorId = doctorDetails._id;
            doctorProfile = await database.findBy(models.doctorProfile,{ '_id': doctorId });
        }
        if(doctorProfile)
        {
           await manageDoctor(req,doctorDetails);
           let  doctorProfileDetails = await manageDoctorProfile(req,doctorProfile,doctorId)
        
           let token = req.headers.authorization; 
           let tokenUser = await database.findBy(models.tokenSchema, { 'token': token } );
           tokenUser.email = doctorDetails.email
           await database.save(tokenUser)
            
           let data = {
            doctorDetails: doctorProfile,
            doctorProfileDetails: doctorProfileDetails   
        }
            return response.send(req, res, next, "info", 200, "PROFILE_UPDATED", data);
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
 * Controller: It is used by doctor to add/update profile.
 */
 const find = async (req,res,next)=>{

    try {
        const email = req.userEmail
        let doctorId;
        let doctorProfileDetails;
        const doctorDetails = await database.findBy(models.doctor,{ 'email': email });
        if(doctorDetails)
        {
            doctorId = doctorDetails._id;
            doctorProfileDetails = await database.findBy(models.doctorProfile,{ '_id': doctorId });
            let data = {
                doctorDetails: doctorDetails,
                doctorProfileDetails: doctorProfileDetails
            }
            return response.send(req, res, next, "info", 200, "PROFILE_DETAILS", data);

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
 * Controller: It is used to logout user.
 */
const logout = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization
        console.log(authToken);
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
    profile,
    updateProfile,
    find,
    logout,
    verifyOTP,
    resendOTP
};



/**
 * Controller: It is manage doctor information.
 */
const manageDoctor = async (req, doctor) => {
    
    const { fullName, email,age,phoneNumber, password } = req.body;
    const encryptedPassword =  await bcrypt.encryption(password);
    doctor.passwordText = password
    doctor.full_name = fullName
    doctor.email = email
    doctor.age = age
    doctor.phone_number = phoneNumber
    doctor.password = encryptedPassword
    
    //return doctor;
    
    return await database.save(doctor);
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
    
    const { gender, dateOfBirth,licenseExpiryDate,address,license,medicalSpecialty } = req.body;
    doctorProfile._id = doctorId
    doctorProfile.gender = gender
    doctorProfile.dateOfBirth = dateOfBirth
    doctorProfile.licenseExpiryDate = licenseExpiryDate
    doctorProfile.license = license
    doctorProfile.medicalSpecialty = medicalSpecialty
    doctorProfile.address = address
    doctorProfile.image = req.files.length>0 ? req.files[0].filename : doctorProfile.image
    return await database.save(doctorProfile);
}


/**
 * Controller: It is used check is email already exist.
 */
 const isDataUnique = async (req) => {
    const {email} = req.body
    let result = await database.findBy(models.doctor,{'email':email})
    if(result)
        return false
    return true
}


