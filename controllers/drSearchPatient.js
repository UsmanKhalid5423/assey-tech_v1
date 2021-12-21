const express = require("express");
const loginRouter = express.Router();
const patientAccount = require("../models/userAccountSchema");
const Joi = require('joi');
const auth = require("../middlewares/auth");

loginRouter.get("/api/drsearchpatient/", auth ,async (req, res) => {
    console.log("DrLogin");
    ///////////////////////////////////////////////////////
    var { email: email } = req.body;

    let val = Joi.object({

        email: Joi.string().email().required(),

    });
    const result = val.validate(req.body);
    if (result.error) {
        return res.status(401).json({ "Error": result.error.details });
    }

    /////////////////////////////////////////////////////////
    try {
        const user = await patientAccount.findOne({ email });
        if (user) {
            console.log(`User Found:${user.full_name}--${user.email}`);
            return res.status(201).json({"User Found":user});

        }
        else {
            return res.status(402).json({ "Message": "User not Found" });
        }

    } catch (error) {
        return res.status(402).json({ "Message": "User not found" });
    }

});

module.exports = loginRouter;