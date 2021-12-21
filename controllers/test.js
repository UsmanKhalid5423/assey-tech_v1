const express = require("express");
const Router = express.Router();
const patientAccount = require("../models/userAccountSchema")


Router.get("/api/test/",async(req,res)=>{

    const data = await patientAccount.find();
    const number = Math.floor( (Math.random() *10) * 78669 + 78888);
    return res.status(201).json({'ALERT':data});
});

module.exports = Router;