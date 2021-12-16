const express = require("express");
const Router = express.Router();
const labReport = require("../models/labReportSchema");

const Joi = require('joi');

Router.post("/api/reportCreated/", async (req, res) => {
    console.log("/api/reportCreated/");
    let date = new Date().toISOString();

    ///////////////////////////////////////////////////////
    var {
        email: email,
        test_Name: test_Name,
        byDr: byDr,
        reportStatus: reportStatus,


    } = req.body;

    let val = Joi.object({
        email: Joi.string().email().required(),
        test_Name: Joi.string().min(2).max(15).required(),
        byDr: Joi.string().email().required(),
        reportStatus: Joi.string().min(2).max(15).required(),
    });

    const result = val.validate(req.body);
    if (result.error) {
        return res.status(401).json({ "Error": result.error.details });
    }

    /////////////////////////////////////////////////////////
    try {
        const labReportSchema = await labReport.create({
            email: email,
            test_Name: test_Name,
            byDr: byDr,
            reportStatus: reportStatus,
            view:"www.google.com.pk",
            date: date,
        });
        return res.status(200).json({ "Lab Report:": labReportSchema });
    } catch (error) {
        return res.status(402).json({ "Error": error });
    }
});

module.exports = Router;