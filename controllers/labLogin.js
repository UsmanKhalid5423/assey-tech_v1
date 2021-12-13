const express = require("express");
const loginRouter = express.Router();
const userLabAccount = require("../models/userLabAccountSchema");
const Joi = require('joi');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

loginRouter.get("/api/labLogin/", async (req, res) => {
    console.log("LabLogin");
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
        const user = await userLabAccount.findOne({ email });
        if (user) {
            try {
                const authenticate_password = await bcrypt.compare(password, user.password);
                if (authenticate_password && email == user.email) {
                    const token = await jwt.sign({ id: user._id }, "goodwork", { expiresIn: "1y", });

                    console.log(`token:${token}`);
                    return res.status(501).json(user);
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