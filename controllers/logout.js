const express = require("express");
const logoutRouter = express.Router();
const tokenSchema = require('../models/tokenSchema');


logoutRouter.get("/api/logout", async (req,res)=>{
   try {
    console.log("Logout working");
    let user = process.env.user;
    console.log(user);
    if(user) await tokenSchema.findOneAndDelete({email:user});
    return res.status(201).json({"Status":true,"Message":"Logout Successfully"});    
} 
   catch (error) { 
    res.status(501).json({"Status":false,"Message":"User not found",error});
   }
});


module.exports = logoutRouter;