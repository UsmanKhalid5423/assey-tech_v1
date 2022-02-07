require("dotenv").config();
const nodeMailer = require("../../utility/service/email");
const General = require('../../database/schema/general')

const contactUs = async (req,res)=>{
const message = req.body.message;
const title = req.body.title;
const  email = req.body.email ?? "ahmadiqbalpu@gmail.com"
let emailBody = `<h1>${title}</h1><br><p>${message}</p>.`;
    const mailSent = await  nodeMailer.dispatchEmail_v3("ContactUS Email ", emailBody,email );
res.status(200).send("Your request is processing,Admin will contact you through provided contact info as soon possible!")
}

const subscribe = async (req,res)=>{
    const subscribe = req.query.userId;
    const body = {
        subscribeUser:[subscribe]
    }
    const subscriberList = await General.find();
    if(subscriberList.length){
        subscriberList[0].subscribeUser.push(subscribe)
        subscriberList[0].save();
        res.status(200).send({message:"user Added in subscriber lists",subscriberList});
    }else{
        const subscribed = General.create(body);
        res.status(201).send({message:"user Added in subscriber lists",subscribed});
    }
}

module.exports = {
    contactUs,
    subscribe
}