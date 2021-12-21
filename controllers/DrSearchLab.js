const express = require("express");
const loginRouter = express.Router();
const LabAccount = require("../models/userLabAccountSchema");
const Joi = require('joi');
const auth = require("../middlewares/auth");

loginRouter.get("/api/drsearchlab/", auth ,async (req, res) => {
    console.log("DrSearchLab");
    ///////////////////////////////////////////////////////
    var { email: email } = req.body;

    let val = Joi.object({  email: Joi.string().email().required()  });
    
    const result = val.validate(req.body);
    if (result.error) {
        return res.status(401).json({ "Error": result.error.details });
    }

    /////////////////////////////////////////////////////////
    try {
        const user = await LabAccount.findOne({ email });
        if (user) {
            console.log(`User Found:${user.lab_name}--${user.email}`);
            return res.status(201).json({"User Found":user});

        }
        else {
            return res.status(402).json({ "Message": "Lab not Found" });
        }

    } catch (error) {
        return res.status(402).json({ "Error from DrSearchLabTryCatch": error });
    }

});

module.exports = loginRouter;