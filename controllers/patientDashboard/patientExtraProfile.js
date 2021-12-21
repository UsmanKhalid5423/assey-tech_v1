const express = require("express");
const Route = express.Router();
const Joi = require('joi'); //for data validate the entering data...
const patientAccountSchema = require("../../models/userAccountSchema");
const patientExtraProfileSchema = require("../../models/patientModels/patientExtraProfileSchema");
const auth = require("../../middlewares/auth");


Route.post("/api/patientRegisProfile/", auth ,async (req, res) => {
    const ParientEmail = process.env.user;
    
   

    var { 
        gender: gender, 
        dateOfBirth: dateOfBirth, 
        insurence_Info: insurence_Info,
        genetic_Disease:genetic_Disease,
        address: address 
    } = req.body;

    var val = Joi.object({
        gender: Joi.string().min(4).max(6).required(),
        dateOfBirth: Joi.string().required(),
        insurence_Info: Joi.string().min(2).max(100).required(),
        genetic_Disease:Joi.string().min(2).max(100).required(),
        address: Joi.string().min(4).max(40).required(),
    });

    const joiResult = val.validate(req.body);
    if (joiResult.error) {
        return res.status(401).json({ "Error": joiResult.error.details[0].message });
    }
    const patientId = await patientAccountSchema.findOne({ ParientEmail });
    const id = patientId._id;
    console.log(id);
    try {

        let PatientID = await patientExtraProfileSchema.exists({ id });
        if (PatientID) {
            let DeleteExistingProfile = await patientExtraProfileSchema.findOneAndDelete({ _id: id });
        }
        const Schema = await patientExtraProfileSchema.create({
            _id: id,
            gender: gender,
            dateOfBirth: dateOfBirth,
            insurence_Info: insurence_Info,
            genetic_Disease: genetic_Disease,
            address: address,
        });

        return res.status(201).json({"Profile:":"Updated"});
    }
    catch (error) {
        return res.status(401).json({ "Errorss": error });
    }

});



module.exports = Route;