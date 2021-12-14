const express = require("express");
const Route = express.Router();
const userAccountSchema = require("../models/userAccountSchema");
const auth = require("../middlewares/auth");


Route.get("/api/home/",auth,async(req,res)=>{
    return res.status(500).json({"ALERT":"Home is working"});
});

module.exports = Route;