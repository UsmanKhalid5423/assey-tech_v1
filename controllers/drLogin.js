const express = require("express");
const loginRouter = express.Router();

const userDrAccount = require("../models/userDrAccountSchema");
const userPatientAccount = require("../models/userAccountSchema");
const userLabAccount = require("../models/userLabAccountSchema");

const Joi = require('joi');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenSchema = require("../models/tokenSchema");
const labReports = require("../models/labReportSchema");
const reportCounts = require("../models/reportsCount");

const auth = require("../middlewares/auth");



loginRouter.get("/api/drLogin/", async (req, res) => {

    ///////////////////////////////////////////////////////
    var { email: email, password: password } = req.body;

    let val = Joi.object({

        email: Joi.string().email().required(),
        password: Joi.string().min(2).max(11).required(),

    });
    const result = val.validate(req.body);
    if (result.error) {
        return res.status(401).json({ "Error": result.error.details });
    }

    /////////////////////////////////////////////////////////
    try {
        const user = await userDrAccount.findOne({ email });
        if (user) {
            console.log("User Doctor");
            try {
                const authenticate_password = await bcrypt.compare(password, user.password);
                if (authenticate_password && email == user.email) {

                    const userToken = await tokenSchema.findOne({ email });
                    if (userToken) {
                        return res.status(501).json(`The User : ${process.env.user} is already Login`);
                    }

                    else {
                        const token = await jwt.sign({ id: user._id }, "goodwork", { expiresIn: "1y", });
                        const data = await tokenSchema.create({
                            token: token,
                            email: email,
                        });
                        process.env.full_name = user.full_name;
                        process.env.user = email;
                        console.log(process.env.user);
                        console.log(`Hi Dr: ${process.env.full_name}`);
                        return res.status(501).json(`The User is Login, Email: ${process.env.user}`);
                    }

                }
                else {
                    return res.status(402).json({ "Message": "Please Enter correct Password" });
                }
            }
            catch (error) {
                return res.status(402).json({ "Message": "error catch" });
            }

        }
        ///////////////Patient IF//////////////////////////////////////////////
        const userPatient = await userPatientAccount.findOne({ email });
        if (userPatient) {
            console.log("User Patient");
            try {
                const authenticate_password = await bcrypt.compare(password, userPatient.password);
                if (authenticate_password && email == userPatient.email) {
                    console.log("hello");
                    const userToken = await tokenSchema.findOne({ email });
                    console.log(userToken);
                    if (userToken) {
                        return res.status(501).json(`The User : ${process.env.user} is already Login`);
                    }
                    else {
                        const token = await jwt.sign({ id: userPatient._id }, "goodwork", { expiresIn: "1y", });
                        const data = await tokenSchema.create({
                            token: token,
                            email: email,
                        });
                        process.env.full_name = userPatient.full_name;
                        process.env.user = email;
                        console.log(process.env.user);
                        console.log(`Hi Dear Patient: ${process.env.full_name}`);
                        return res.status(501).json(`The User is Login, Email: ${process.env.user}`);
                    }

                }
                else {
                    return res.status(402).json({ "Message": "Please Enter correct Password" });
                }
            }
            catch (error) {
                return res.status(402).json({ "Messages": error });
            }

        }
        /////////////Patient IF////////////////////////////////////////////

        ///////////////Lab IF//////////////////////////////////////////////
        const userLab = await userLabAccount.findOne({ email });
        if (userLab) {
            console.log("User Lab");
            try {
                const authenticate_password = await bcrypt.compare(password, userLab.password);
                if (authenticate_password && email == userLab.email) {
                    console.log("hello");
                    const userToken = await tokenSchema.findOne({ email });
                    console.log(userToken);
                    if (userToken) {
                        return res.status(501).json(`The User : ${process.env.user} is already Login`);
                    }
                    else {
                        const token = await jwt.sign({ id: userLab._id }, "goodwork", { expiresIn: "1y", });
                        const data = await tokenSchema.create({
                            token: token,
                            email: email,
                        });
                        process.env.full_name = userLab.lab_name;
                        process.env.user = email;
                        console.log(process.env.user);
                        console.log(`Hi Lab Admin: ${process.env.full_name}`);
                        return res.status(501).json(`The User is Login, Email: ${process.env.user}`);
                    }

                }
                else {
                    return res.status(402).json({ "Message": "Please Enter correct Password" });
                }
            }
            catch (error) {
                return res.status(402).json({ "Messages": error });
            }

        }
        /////////////Lab IF////////////////////////////////////////////
        else {
            return res.status(402).json({ "Message": "User not Found else" });
        }

    } catch (error) {
        return res.status(402).json({ "Message": "User not found catch" });
    }

});

module.exports = loginRouter;