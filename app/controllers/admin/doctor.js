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
 * Controller: It is used by doctor to add/update profile.
 */
const profile = async (req,res,next)=>{
    try {
        const id = req.params.id
        const doctorDetails = await database.findBy(models.doctor,{ '_id': id });
        if(doctorDetails)
        {
            const doctorId = doctorDetails._id;
            const doctorProfiledetails = await database.findBy(models.doctorProfile,{ '_id': doctorId });
            if(doctorProfiledetails)
            {
                return response.send(req, res, next, "info", 200, "PROFILE_ALREADY_EXISTS", doctorProfiledetails);
            }
            
            console.log('==== >>> BEFORE DOC UPDATE === >>',doctorDetails)


            let doctor = await manageDoctor_v2(req,doctorDetails);

            console.log('==== >>> AFTER DOC UPDATE === >>',doctor)

            let  doctorProfile = new models.doctorProfile()
            let profile = await manageDoctorProfile(req,doctorProfile,doctorId)
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
        const id = req.params.id
        let doctorProfile;
        let doctorId;
        const doctorDetails = await database.findBy(models.doctor,{ '_id': id });
        if(doctorDetails)
        {
            doctorId = doctorDetails._id;
            doctorProfile = await database.findBy(models.doctorProfile,{ '_id': doctorId });
        }
        if(doctorProfile)
        {
            await manageDoctor_v2(req,doctorDetails);
            let  doctorProfileDetails = await manageDoctorProfile(req,doctorProfile,doctorId)
            let data = {
                doctorDetails: doctorProfile,
                doctorProfileDetails: doctorProfileDetails   
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



/**
 * Controller: It is used by doctor to add/update profile.
 */
 const find = async (req,res,next)=>{

    try {
        const id = req.params.id
        let doctorId;
        let doctorProfileDetails;
        const doctorDetails = await database.findBy(models.doctor,{ '_id': id });
        if(doctorDetails)
        {
            doctorId = doctorDetails._id;
            doctorProfileDetails = await database.findBy(models.doctorProfile,{ '_id': doctorId });
            let data = {
                doctorDetails: doctorDetails,
                doctorProfileDetails: doctorProfileDetails
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
       
        let data = await database.fetch(models.doctor,query)
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
        let doctorId;
        const doctorDetails = await database.findBy(models.doctor,{ '_id': id });
        if(doctorDetails)
        {
            doctorId = doctorDetails._id;
            await database.remove(models.doctorProfile,{ '_id': doctorId });
            await database.remove(models.doctor,{ '_id': doctorId });

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
    signUp,
    profile,
    updateProfile,
    find,
    fetch,
    remove,
};



/**
 * Controller: It is manage doctor information.
 */
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
    let result = await database.findBy(models.doctor,{'email':email})
    if(result)
        return false
    return true
}