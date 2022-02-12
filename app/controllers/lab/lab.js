/*******************************************************/
// Importing Files.
/*******************************************************/
const database = require("../../utility/calls/databaseRequest");
const response = require("../../utility/function/response");
const models = require("../../../database/schema/instance");
const code = require("../../utility/function/code");
const nodeMailer = require("../../../utility/service/email");

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
 * Controller: It is used create patient.
 */
 const signUp = async (req , res ,next) =>{
    try {

        const {email} = req.body
        const OTP = code.otpCode();
        const isUnique = await isDataUnique(req);
        if(!isUnique)
        {
            return response.send(req, res, next, "info", 208, "ALREADY_EXISTS", null);
        }
        req.body.OTP = OTP 
        let emailBody = `This is your one time OTP password. Use this password to complete signup process.<br>
                        ${OTP}
                        <br>Please don't share it with anyone.`

        nodeMailer.dispatchEmail_v3("OTP Password", emailBody,email );
        let result = await manageLab(req,new models.lab())
        //delete result.OTP
        delete result.isEmailVerified
        delete result.password
        return response.send(req, res, next, "info", 201, "VERIFY_EMAIL", result);

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

// old
/**
 * Controller: It is used create admin.
 */
 const signUp_old = async (req, res, next) => {
    try {
        const isUnique = await isDataUnique(req);
        if(!isUnique)
        {
            return response.send(req, res, next, "info", 208, "ALREADY_EXISTS", null);
        }
        let result = await manageLab(req,new models.lab() )
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
        const user = await database.findBy(models.lab,{ 'email': email });
        if (user && user.isEmailVerified) {
            const comparingPasswords = await bcrypt.comparsion(password, user.password);
            if (comparingPasswords) {

                await models.tokenSchema.findOneAndDelete({email: email})
                // if (userToken) {
                //     return response.send(
                //         req,
                //         res,
                //         next,
                //         "info",
                //         202,
                //         "ALREADY_LOGGED_IN",
                //         null
                //     );
                // }
                    const token = await jwt.sign({ id: user._id }, "goodwork", { expiresIn: "1y", });
                    const data = await models.tokenSchema.create({
                        token: token,
                        email: email,
                    });

                    let result = {
                        data,
                        userType: 'lab'
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
        else if(user && !user.isEmailVerified)
        {
            const OTP = code.otpCode();
            let emailBody = `This is your one time OTP password. Use this password to complete signup process.<br>
                        ${OTP}
                        <br>Please don't share it with anyone.`

            nodeMailer.dispatchEmail_v3("OTP Password", emailBody,email);
            user.OTP = OTP;
            await database.save(user)
            delete user.OTP
            delete user.isEmailVerified
            delete user.password
            return response.send(req, res, next, "info", 200, "VERIFY_EMAIL", user);

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
        
        const user = await database.findBy(models.lab,{ 'email': email });
        console.log('==== >>> user == >>> ',user)
        if(user)
        {
            if(user.OTP==OTP)
            {
                user.isEmailVerified = true
                user.joiningDate = moment().format('YYYY-MM-DD')

                await database.save(user)
                console.log('==== >>> user == >>> ++++ ---- ',user)

                delete user.OTP
                delete user.isEmailVerified
                delete user.password
                return response.send(req, res, next, "info", 200, "SIGN_UP_COMPLETED", user);
            }
            else
            {
                return response.send(req, res, next, "info", 200, "INCORRECT_OTP", null);
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
        console.log('=== >> email == >> ',email)
        const user = await database.findBy(models.lab,{ 'email': email });
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
        let labUserDetails = await database.findBy(models.lab,{ 'email': email });
        if(labUserDetails)
        {
            const labUserId = labUserDetails._id;
            const labProfiledetails = await database.findBy(models.labProfile,{ '_id': labUserId });
            if(labProfiledetails)
            {
                return response.send(req, res, next, "info", 208, "LAB_ALREADY_EXISTS", labProfiledetails);
            }
            labUserDetails = await manageLab(req,labUserDetails)
            
            let token = req.headers.authorization; 
            let tokenUser = await database.findBy(models.tokenSchema, { 'token': token } );
            tokenUser.email = labUserDetails.email
            await database.save(tokenUser)

            let  labProfile = new models.labProfile()
            let result = await manageLabProfile(req,labProfile,labUserId)
            data = {
                labDetails: labUserDetails,
                labProfileDetails: result   
            }
            return response.send(req, res, next, "info", 201, "LAB_ADDED", data);
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
        let labProfile;
        let labId;
        let labDetails = await database.findBy(models.lab,{ 'email': email });
        if(labDetails)
        {
            labId = labDetails._id;
            labProfile = await database.findBy(models.labProfile,{ '_id': labId });
        }
        if(labProfile)
        {
            labDetails = await manageLab(req,labDetails)
            let  labProfileDetails = await manageLabProfile(req,labProfile,labId)
           
            let token = req.headers.authorization; 
            let tokenUser = await database.findBy(models.tokenSchema, { 'token': token } );
            tokenUser.email = labDetails.email
            await database.save(tokenUser)
            
            let data = {
                labProfile: labDetails,
                labProfileDetails: labProfileDetails
            }
            return response.send(req, res, next, "info", 200, "LAB_UPDATED", data);
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
        let labId;
        let labProfileDetails;
        const labDetails = await database.findBy(models.lab,{ 'email': email });
        if(labDetails)
        {
            labId = labDetails._id;
            labProfileDetails = await database.findBy(models.labProfile,{ '_id': labId });
            let data = {
                labDetails: labDetails,
                labProfileDetails: labProfileDetails
            }
            return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", data);

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
const manageLab = async (req, lab) => {
    
    const { lab_name, email,phone_number, password , startDate } = req.body;
    const encryptedPassword =  await bcrypt.encryption(password);
    lab.passwordText = password
    lab.lab_name = lab_name
    lab.email = email
    lab.phone_number = phone_number
    lab.password = encryptedPassword
    lab.startDate = startDate
    
    return await database.save(lab);
}

/**
 * Controller: It is manage doctor profile/extra information.
 */
const manageLabProfile = async (req, labProfile,labId) => {
    
    const { address, licNumber } = req.body;
    labProfile._id = labId
    labProfile.licNumber = licNumber
    labProfile.address = address
    labProfile.image = req.files.length>0 ? req.files[0].filename : labProfile.image
    return await database.save(labProfile);
}

/**
 * Controller: It is used check is email already exist.
 */
 const isDataUnique = async (req) => {
    const {email} = req.body
    let result = await database.findBy(models.lab,{'email':email})
    if(result)
        return false
    return true
}
