const express = require("express");

const Route = express.Router();
const Joi = require('joi'); //for data validate the entering data...
const TestSchema = require("../models/testsSchema");

Route.post("/api/enterTest/", async (req, res) => {

    var { test_name: test_name, type:type } = req.body;

    var val = Joi.object({
        test_name: Joi.string().min(2).max(15).required(),
        type: Joi.string().min(2).max(15).required(),
    });

    const joiResult = val.validate(req.body);
    if (joiResult.error) {
        return res.status(401).json({ "Error": joiResult.error.details[0].message });
    }
    console.log("test route barrier");
    try {
        let existing_test = await TestSchema.exists({ test_name });
        console.log("lab barrer2");
        if (existing_test) {
            return res.status(406).json({ "Error": "Test Exist, Try another Test" });
        }
        const Schema = await TestSchema.create({
            test_name: test_name,
            type: type,
        });
        console.log("lab barrer6");

        console.log("The Test has been registered successfully");

        return res.status(501).json({ "Alert:": "The Test has been registered successfully " });
    }
    catch (error) {
        return res.status(401).json({ "error": "last catch" });
    }

});



module.exports = Route;