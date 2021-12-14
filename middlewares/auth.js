const jwt = require('jsonwebtoken');
const registerUser = require('../models/userAccountSchema');
const patients = require("../models/userAccountSchema");
const doctors = require("../models/userDrAccountSchema");
const Labs = require("../models/userLabAccountSchema");




//////////Getting The token from the Header//////////////
const auth = async function auth_token(req,res,next){
    try {
        const header = req.headers["authorization"]; //getting authorization header
        const token = header && header.split(" ")[1]; // spliting the Header veriable
      
        if(token == null) return res.status(501).json({"Message":"Token Not Found"});
        jwt.verify(token,"goodwork",(err,user)=>{
            if(err)  return res.status(501).json( { "Message":"Invalid Token" } );
            console.log(user.id);
           req.user = user.id;
        });
        const patient = await patients.findOne({_id:req.user});
        if(patient){return res.status(501).json({"Found One":patient});}
        
        const doctors = await doctors.findOne({_id:req.user});
        if(doctors){return res.status(501).json({"Found One":doctors});}
        
        const Labs = await doctors.findOne({_id:req.user});
        if(Labs) {return res.status(501).json({"Found One":Labs});}

        
        console.log("Auth End");
        next();
    } 
    catch (error) {
        console.log("The Detail Of error from Auth"+error);
        res.status(404).json({"Message":"Token Not Found","Status":false,error});
    }
}


module.exports = auth;