const express = require("express");
const Router = express.Router();
const Joi = require('joi');
const bcrypt = require("bcrypt");
Router.get("/api/labforgetPassword/", async (req, res) => {

    var { email: email, phone: phone, newPassword: newPassword } = req.body;
    const labAccounts = require("../models/userLabAccountSchema");

    let val = Joi.object({

        email: Joi.string().email().required(),
        phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
        newPassword: Joi.string().alphanum().min(3).max(30).required(),

    });
    const result = val.validate(req.body);
    if (result.error) {
        return res.status(401).json({ "Error": result.error.details[0].message });
    }
    try {
        
        const user = await labAccounts.findOne({ email });
        if (user) {
            if (user.phone_number == phone) {
                const hashPass = await bcrypt.hash(newPassword, 10);
                const update = await labAccounts.findOneAndUpdate({ email }, {
                    _id: user._id, lab_name: user.lab_name,
                    email: user.email, phone_number: user.phone_number, password: hashPass
                });

                /////////////////////////////
                if (update) {
                    const newUser = await labAccounts.findOne({ email });
                    return res.status(501).json({ "ALERT:User Updated:": newUser });
                }
                else return res.status(400).json({ "ERROR": "Not Updated" });
            }
            else return res.status(401).json({ "ERROR": "Phone Number not Matched" });
        }
        else return res.status(401).json({ "ERROR": "User not found" });
    } catch (error) {
        return res.status(401).json({ "ERROR": "User not found,Please enter co" });
    }





    return res.status(501).json({ "ALERT": "The ForgetPassword is Working" });
});

module.exports = Router;