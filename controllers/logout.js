const express = require("express");
const logoutRouter = express.Router();
const tokenSchema = require('../models/tokenSchema');
const resultReports = require("../models/labReportSchema");
const reportCountSchema = require("../models/reportsCount")

logoutRouter.get("/api/logout", async (req,res)=>{
   try {
    console.log("Logout working");
    let user = process.env.user;
    const labReports = await resultReports.find({
      byDr:process.env.user,
  });
  ////////////////////////////////

  let found = await reportCountSchema.findOne({
     email:user
  });
  if(found){
      let founded = await reportCountSchema.findOneAndUpdate({
         email:user,
         count:labReports.length
      });
      // return res.status(201).json({"Updated":founded});
  }
 else{
   let schema = await reportCountSchema.create({
      email:user,
      count:labReports.length,
  });
//   return res.status(201).json({"New Created":schema});
 }



 ////////////////////////////////////
  console.log(user);
    if(user) await tokenSchema.findOneAndDelete({email:user});
    process.env.user = 0;
    console.log(process.env.user);
    return res.status(201).json({"Status":true,"Message":"Logout Successfully"});    
} 
   catch (error) { 
    res.status(501).json({"Status":false,"Message":"User not found",error});
   }
});


module.exports = logoutRouter;