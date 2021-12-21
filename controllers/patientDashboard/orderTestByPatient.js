const express = require("express");
const Router = express.Router();
const userAccountSchema = require("../../models/userAccountSchema");
const patientTestOrderSchema = require("../../models/patientModels/patientTestOrderSchema");
const test = "COVID 19";
const auth = require("../../middlewares/auth");

const Joi = require('joi');



Router.post("/api/patientordertest/", auth, async (req, res) => {


    ///////////////////////////////////////

    try {
        let userPatientEmail = process.env.user;
        let foundPatient = await userAccountSchema.findOne({ email: userPatientEmail });
        if (foundPatient) {

            let date = new Date().toISOString();
            let orderTest = patientTestOrderSchema.create({
                id: foundPatient._id,
                test_name: test,
                date: date,
            });
            if (orderTest) { return res.status(200).json({ "ATERT": `Test Ordered Successfully by:${foundPatient.email}` }); }
            else { return res.status(401).json({ "Error": `Something went wrong,Test Order Failet` }); }

        }
        else { return res.status(401).json({ "ERROR": `Patient Not Found` }); }
    } catch (error) {

        return res.status(404).json({ "error": `process.env.user: is ${process.env.user}` });
    }






    return res.status(200).json({ "ATERT": `${process.env.user}` });
});


module.exports = Router;