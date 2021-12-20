const express = require("express");
const Route = express.Router();
const Joi = require('joi'); //for data validate the entering data...
const labAccountSchema = require("../../models/userLabAccountSchema");
const labExtraProfileSchema = require("../../models/labModels/labExtraProfile");



Route.post("/api/labRegisProfile/", async (req, res) => {
    const LabEmail = process.env.user;



    var {
        address: address,
        licNumber: licNumber,
    } = req.body;

    var val = Joi.object({
            address: Joi.string().min(4).max(40).required(),
            licNumber: Joi.string().min(4).max(6).required(),
    });

    const joiResult = val.validate(req.body);
    if (joiResult.error) {
        return res.status(401).json({ "Error": joiResult.error.details[0].message });
    }
    const labId = await labAccountSchema.findOne({ LabEmail });
    const id = labId._id;
    console.log(id);
    try {

        let PatientID = await labExtraProfileSchema.exists({ id });
        if (PatientID) {
            let DeleteExistingProfile = await labExtraProfileSchema.findOneAndDelete({ _id: id });
        }
        const Schema = await labExtraProfileSchema.create({
            _id: id,
            address: address,
            licNumber: licNumber,
        });

        return res.status(201).json({ "Profile:": "Updated" });
    }
    catch (error) {
        return res.status(401).json({ "Errorss": error });
    }

});



module.exports = Route;