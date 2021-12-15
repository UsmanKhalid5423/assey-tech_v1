const express = require("express");

const LabRegis = express.Router();
const Joi = require('joi'); //for data validate the entering data...
const bcrypt = require("bcrypt");
const userLabAccountSchema = require("../models/userLabAccountSchema");

LabRegis.post("/api/labRegis/", async (req, res) => {

    var { lab_name: lab_name, email: email,
        phone_number: phone_number, password: password,
        confirm_password: confirm_password } = req.body;

    var val = Joi.object({
        lab_name: Joi.string().min(2).max(15).required(),
        email: Joi.string().min(2).email().required(),
        phone_number: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(2).max(11).required(),
        confirm_password: Joi.ref('password'),
    });

    const joiResult = val.validate(req.body);
    if (joiResult.error) {
        return res.status(401).json({ "Error": joiResult.error.details[0].message });
    }
    console.log("lab barrer");
    try {
        let existing_email = await userLabAccountSchema.exists({ email });
        console.log("lab barrer2");
        if (existing_email) {
            return res.status(406).json({ "Error": "Email Exist, Try another email" });
        }
        console.log("lab barrer3");
        let existing_number = await userLabAccountSchema.exists({ phone_number });
        if (existing_number) {
            return res.status(406).json({ "Error": "number Exist, Try another number" },);
        }
        console.log("lab barrer4");
        const hashPass = await bcrypt.hash(password, 10);
        console.log("lab barrer5");
        console.log(email, lab_name, phone_number, hashPass);
        const Schema = await userLabAccountSchema.create({
            lab_name: lab_name,
            email: email,
            phone_number: phone_number,
            password: hashPass,
        });
        console.log("lab barrer6");

        console.log("Your Lab account has been registered successfully");

        return res.status(501).json({ "Alert:": "Your Lab account has been registered successfully " });
    }
    catch (error) {
        return res.status(401).json({ "error": "last catch" });
    }

});



module.exports = LabRegis;