const express = require("express");
const Route = express.Router();
const Joi = require('joi'); //for data validate the entering data...
const DrAccountSchema = require("../models/userDrAccountSchema");
const DrProfileSchema = require("../models/drExtraProfile");



Route.get("/api/drRegisProfile", async (req, res) => {
    const DrEmail = process.env.user;
     console.log(DrEmail);
    
    var { gender: gender, dateOfBirth: dateOfBirth, medicalSpecialty: medicalSpecialty,
        address: address} = req.body;

    var val = Joi.object({
        gender: Joi.string().min(4).max(6).required(),
        dateOfBirth: Joi.string().required(),
        medicalSpecialty: Joi.string().min(2).max(100).required(),
        address: Joi.string().min(4).max(40).required(),
    });

    const joiResult = val.validate(req.body);
    if (joiResult.error) {
        return res.status(401).json({ "Error": joiResult.error.details[0].message });
    }
    const DrId = await DrAccountSchema.findOne({DrEmail});
    const id = DrId._id;
    console.log(id);
    try {
        
        let DoctorID = await DrAccountSchema.exists({ id });
        if (DoctorID) {
            let DeleteExistingProfile = await DrProfileSchema.findOneAndDelete({_id:id});
        }
            const Schema = await DrProfileSchema.create({
                _id: id,
                gender: gender,
                dateOfBirth: dateOfBirth,
                medicalSpecialty: medicalSpecialty,
                address: address,
            });
        
        return res.status().json({ "ALERT:": "Profile Updated"},{DoctorID});
    }
    catch (error) {
        return res.status(401).json({ "error": error });
    }

});



module.exports = Route;