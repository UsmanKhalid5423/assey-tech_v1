const express = require("express");

const drRegis = express.Router();
const Joi = require('joi'); //for data validate the entering data...
const bcrypt = require("bcrypt");
const userDrAccountSchema = require("../models/userDrAccountSchema");

drRegis.post("/api/drRegis", async (req, res) => {

    var { full_name: full_name, age: age, email: email,
        phone_number: phone_number, password: password,
        confirm_password: confirm_password } = req.body;

    var val = Joi.object({
        full_name: Joi.string().min(2).max(15).required(),
        age: Joi.number().min(15).max(200).required(),
        email: Joi.string().min(2).email().required(),
        phone_number: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
        password: Joi.string().min(2).max(11).alphanum().required(),
        confirm_password: Joi.ref('password'),
    });

    const joiResult = val.validate(req.body);
    if (joiResult.error) {
        return res.status(401).json({ "Error": joiResult.error.details[0].message });
    }

    try {
        let existing_email = await userDrAccountSchema.exists({ email });
        if (existing_email) {
            return res.status(406).json({ "Error": "Email Exist, Try another email" });
        }
        let existing_number = await userDrAccountSchema.exists({ phone_number });
        if (existing_number) {
            return res.status(406).json({ "Error": "number Exist, Try another number" },);
        }

        const hashPass = await bcrypt.hash(password, 10);

        const Schema = await userDrAccountSchema.create({
            full_name: full_name,
            age: age,
            email: email,
            phone_number: phone_number,
            password: hashPass,
        });


        console.log("Your account has been registered successfully");
        return res.status(501).json({ "Alert:": "Your account has been registered successfully " });
    }
    catch (error) {
        return res.status(401).json({ "error": error });
    }

});



module.exports = drRegis;