const express = require("express");
const Router = express.Router();
const labReport = require("../models/labReportSchema");

const Joi = require('joi');

Router.post("/api/reportCreated/", async (req, res) => {
    let date = new Date().toISOString();

    ///////////////////////////////////////////////////////
    var {
        /// id testname reportStatus view date
        id: id,
        test_Name: test_Name,
        reportStatus: reportStatus,

    } = req.body;

    let val = Joi.object({
        id: Joi.string().length(24).required(),
        test_Name: Joi.string().min(2).max(15).required(),
        reportStatus: Joi.string().min(2).max(15).required(),
    });

    const result = val.validate(req.body);
    if (result.error) {
        return res.status(401).json({ "Error": result.error.details });
    }

    /////////////////////////////////////////////////////////
    try {
        const labReportSchema = await labReport.create({
            id: id,
            test_Name: test_Name,
            reportStatus: reportStatus,
            view:'https://www.google.com/',
            date: date,
        });
        return res.status(200).json({ "Lab Report:": labReportSchema });
    } catch (error) {
        return res.status(402).json({ "Error": error });
    }
});

module.exports = Router;