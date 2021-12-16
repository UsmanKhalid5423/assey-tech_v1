const express = require("express");
const Route = express.Router();
const LabReports = require("../models/labReportSchema");



Route.get("/api/reportsearch/", async (req, res) => {
try {
    if(process.env.user == 0){
        return res.status(404).json({"ALERT":"Please login first"});
    }
    else{
    console.log(process.env.user);
    const resultReposts = await LabReports.find({
        byDr:process.env.user,
    });
    return res.status(200).json({"Reports":resultReposts});}


} catch (error) {
    return res.status(401).json({"ERROR":error});
}
});



module.exports = Route;

/////////////////////////

Route.get("/api/reportsearch1/", async (req, res) => {
    try {
       console.log("2 is working")
        return res.status(200).json({"Reports":"working"});
    
    
    } catch (error) {
        return res.status(401).json({"ERROR":error});
    }
    });
    
    
    
    module.exports = Route;
