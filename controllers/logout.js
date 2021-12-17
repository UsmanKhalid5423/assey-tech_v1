const express = require("express");
const logoutRouter = express.Router();
const tokenSchema = require('../models/tokenSchema');
const resultReports = require("../models/labReportSchema");
const reportCountSchema = require("../models/reportsCount")

logoutRouter.get("/api/logout", async (req, res) => {
   try {

      let user = process.env.user;

      ////////////for notifications//////////////////////////////////
      //     const labReports = await resultReports.find({
      //       byDr:process.env.user,
      //   });
      //   ////////////////////////////////

      //   let found = await reportCountSchema.findOne({
      //      email:user
      //   });
      //   if(found){
      //       let founded = await reportCountSchema.findOneAndUpdate({
      //          email:user,
      //          count:labReports.length
      //       });
      //       // return res.status(201).json({"Updated":founded});
      //   }
      //  else{
      //    let schema = await reportCountSchema.create({
      //       email:user,
      //       count:labReports.length,
      //   });
      // //   return res.status(201).json({"New Created":schema});
      //  }
      ////////////////////////////////////////////////////////////////


      ////////////////////////////////////
      console.log(`User Logout Successfuly:${user}`);
      if (user) {
         let found = await tokenSchema.findOneAndDelete({ email: user });
         return res.status(201).json({ "Status": true, "Message": `${user} Logout Successfully` });
      }
      else {
         return res.status(401).json({ "Status": false, "ALERT !": `${user} User Not Found` });
      }
   }
   catch (error) {  
     return res.status(501).json({ "Status": false, "Message": "User not found", error });
   }
});


module.exports = logoutRouter;