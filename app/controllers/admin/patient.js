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




const profile = async (req,res,next)=>{
    try {
        const id = req.params.id
        const patientDetails = await database.findBy(models.patient,{ '_id': id });
        if(patientDetails)
        {
            const patientId = patientDetails._id;
            const patientProfiledetails = await database.findBy(models.patientProfile,{ '_id': patientId });
            if(patientProfiledetails)
            {
                return response.send(req, res, next, "info", 208, "PROFILE_ALREADY_EXISTS", patientProfiledetails);
            }
           
            patientDetails = await managePatient(req,patientDetails)
            let  patientProfileDetails = await managePatientProfile(req,patientProfile,patientId)
            let data = {
                patientProfile: patientDetails,
                patientProfileDetails: patientProfileDetails
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
        const id = req.params.id
        let patientProfile;
        let patientId;
        let patientDetails = await database.findBy(models.patient,{ '_id': id });
        if(patientDetails)
        {
            patientId = patientDetails._id;
            patientProfile = await database.findBy(models.patientProfile,{ '_id': patientId });
        }
        if(patientProfile)
        {
            patientDetails = await managePatient(req,patientDetails)
            let  patientProfileDetails = await managePatientProfile(req,patientProfile,patientId)
            let data = {
                patientProfile: patientDetails,
                patientProfileDetails: patientProfileDetails
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
/**
 * Controller: It is used by doctor to add/update profile.
 */
 const find = async (req,res,next)=>{

    try {
        const id = req.params.id
        let patientProfileDetails;
        const patientDetails = await database.findBy(models.patient,{ '_id': id });
        if(patientDetails)
        {
            patientProfileDetails = await database.findBy(models.patientProfile,{ '_id': id });
            let data = {
                patientDetails: patientDetails,
                patientProfileDetails: patientProfileDetails
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
 * Controller: It is used by doctor to add/update profile.
 */
 const fetch = async (req,res,next)=>{

    try {
        const { search } = req.query;

        if (search)
            query = { $or: [{ 'full_name': { $regex: search, $options: "i" } }] };
        else
            query = {};
       
        let data = await database.fetch(models.patient,query)
        return response.send(req, res, next, "info", 200, "FETCH_SUCCESSFULLY", data);

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
 const remove = async (req,res,next)=>{

    try {
        const id = req.params.id
        let labId;
        const labDetails = await database.findBy(models.patient,{ '_id': id });
        if(labDetails)
        {
            labId = labDetails._id;
            await database.remove(models.patientProfile,{ '_id': labId });
            await database.remove(models.patient,{ '_id': labId });
            return response.send(req, res, next, "info", 200, "REMOVED_SUCCESSFULLY", null);
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





/*******************************************************/
// Exporting Controllers.
/*******************************************************/
module.exports = {
    profile,
    updateProfile,
    find,
    fetch,
    remove
};

const managePatient = async (req,patient)=>{
    const { fullName, email, age, phoneNumber, password, OTP} = req.body;
    const encryptedPassword = await bcrypt.encryption(password);
    patient.passwordText = password
    patient.full_name = fullName
    patient.email = email
    patient.age = age
    patient.phone_number = phoneNumber
    patient.password = encryptedPassword
    patient.OTP = OTP
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
