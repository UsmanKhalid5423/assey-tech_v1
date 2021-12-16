const express = require("express");
const loginRouter = express.Router();
const userDrAccount = require("../models/userDrAccountSchema");
const Joi = require('joi');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenSchema = require("../models/tokenSchema");
const labReports = require("../models/labReportSchema");
const reportCounts = require("../models/reportsCount");
loginRouter.get("/api/drLogin/", async (req, res) => {
    console.log("DrLogin");
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
            try {
                const authenticate_password = await bcrypt.compare(password, user.password);
                if (authenticate_password && email == user.email) {
                    const token = await jwt.sign({ id: user._id }, "goodwork", { expiresIn: "1y", });
                    const data = await tokenSchema.create({
                        token:token,
                        email:email,
                    });
                    process.env.user = email;
                    console.log(process.env.user);

                    // const labReports = await resultReports.find({
                    //     byDr:process.env.user,
                    // });
                    // console.log(`from login labReports.length:${labReports.length}`);
                    // const reports = await reportCounts.find({
                    //     email:process.env.user,
                    // });
                    // console.log(reports);

                    // if(labReports > reports){
                    //     console.log(`you have a new report`);
                    // }
                    
                    // console.log(`LOGIN process.env.reportsCounts:${process.env.reportsCounts}`);
                    return res.status(501).json(`The User is Login, Email: ${process.env.user}`);
                }
                else {
                    return res.status(402).json({ "Message": "Please Enter correct Password" });
                }
            }
            catch (error) {
                return res.status(402).json({ "Message": "error catch" });
            }

        }
        else {
            return res.status(402).json({ "Message": "User not Found" });
        }

    } catch (error) {
        return res.status(402).json({ "Message": "User not found" });
    }

});

module.exports = loginRouter;