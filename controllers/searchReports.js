const express = require("express");
const Route = express.Router();
const LabReports = require("../models/labReportSchema");
const userAccountSchema = require("../models/userAccountSchema");


Route.get("/api/reportsearch/", async (req, res) => {
try {
    if(process.env.user == 0){
        return res.status(404).json({"ALERT":"Please login first"});
    }
    else{
    console.log(process.env.user);
    const resultReports = await LabReports.find({
        byDr:process.env.user,
    });
    return res.status(200).json({"Reports":resultReports});}


} catch (error) {
    return res.status(401).json({"ERROR":error});
}
});



module.exports = Route;

/////////////////////////

Route.get("/api/reportsearchbypatient/", async (req, res) => {
    try {
        if(process.env.user == 0){
            return res.status(404).json({"ALERT":"Please login first"});
        }
        else{

        console.log(process.env.user);
        const resultReports = await LabReports.find({
            email:process.env.user,
        });
        return res.status(200).json({"Reports":resultReports});}
    
    
    } catch (error) {
        return res.status(401).json({"ERROR":error});
    }
    });

    /////////////////////////twilio////////////////////////






const twilio = require('twilio')('','');
Route.get("/api/send/", async (req, res) => {
    try {
        console.log("send");

        twilio.messages.create({
            body:"Hello receiver",
            to:"",
            from:"",
        });


        return res.status(200).json({"ALERT":"send"});
    
    
    } catch (error) {
        return res.status(401).json({"ERROR":error});
    }
    });