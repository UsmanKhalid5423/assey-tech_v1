

const database = require("../../utility/calls/databaseRequest");
const models = require("../../../database/schema/instance");
const response = require("../../utility/function/response");




const bcrypt = require("../../utility/function/bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();




const signUp = async (req , res ,next) =>{
    try {
        let result = await managePatient(req, new models.patient());
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

const login = async(req, res, next)=>{
    try {
        const { email, password } = req.body;
        const user = await database.findBy(models.patient,{ 'email': email });
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

const profile = async (req,res,next)=>{
    try {
        const email = req.userEmail
        const patientDetails = await database.findBy(models.patient,{ 'email': email });
        if(patientDetails)
        {
            const patientId = patientDetails._id;
            const patientProfiledetails = await database.findBy(models.patientProfile,{ '_id': patientId });
            if(patientProfiledetails)
            {
                return response.send(req, res, next, "info", 200, "PROFILE_ALREADY_EXISTS", patientProfiledetails);
            }
            let  patientProfile = new models.patientProfile()
            let result = await managePatientProfile(req,patientProfile,patientId)

            return response.send(req, res, next, "info", 201, "PROFILE_ADDED", result);
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

///////////////////////////////////


/**
 * Controller: It is used by doctor to add/update profile.
 */
 const updateProfile = async (req,res,next)=>{

    try {
        const email = req.userEmail
        let patientProfile;
        let patientId;
        const patientDetails = await database.findBy(models.patient,{ 'email': email });
        if(patientDetails)
        {
            patientId = patientDetails._id;
            patientProfile = await database.findBy(models.patientProfile,{ '_id': patientId });
        }
        if(patientProfile)
        {
            let  patientProfileDetails = await managePatientProfile(req,patientProfile,patientId)
            return response.send(req, res, next, "info", 201, "PROFILE_UPDATED", patientProfileDetails);
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










///////////////////////////////////


const logout = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization
        console.log(authToken);
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





//////////////////////////////////


/**
 * Controller: It is used by doctor to add/update profile.
 */
 const find = async (req,res,next)=>{

    try {
        const email = req.userEmail
        let patientId;
        let patientProfileDetails;
        const patientDetails = await database.findBy(models.patient,{ 'email': email });
        if(patientDetails)
        {
            patientId = patientDetails._id;
            patientProfileDetails = await database.findBy(models.patientProfile,{ '_id': patientId });
            let data = {
                patientDetails: patientDetails,
                patientProfileDetails: patientProfileDetails
            }
            return response.send(req, res, next, "info", 201, "PROFILE_UPDATED", data);

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





//////////////////////////////////


module.exports = {
    signUp,login,profile,updateProfile,logout,find
}

const managePatient = async (req,patient)=>{
    const { fullName, email, age, phoneNumber, password} = req.body;
    const encryptedPassword = await bcrypt.encryption(password);

    patient.full_name = fullName
    patient.email = email
    patient.age = age
    patient.phone_number = phoneNumber
    patient.password = encryptedPassword

    return await database.save(patient);

}

/**
 * Controller: It is manage patient profile/extra information.
 */
 const managePatientProfile = async (req, patientProfile,patientId) => {
    
    const { gender, dateOfBirth,insurence_Info,genetic_Disease,address } = req.body;
    patientProfile._id = patientId
    patientProfile.gender = gender
    patientProfile.dateOfBirth = dateOfBirth
    patientProfile.insurence_Info = insurence_Info
    patientProfile.genetic_Disease = genetic_Disease
    patientProfile.address = address
    patientProfile.image = req.files.length>0 ? req.files[0].filename : patientProfile.image
    return await database.save(patientProfile);
}
