const pass = '';



const express = require("express");
const Route = express.Router();
const nodemailer = require("nodemailer");
const Joi = require("joi");















Route.post("/api/SendSighUpLink/", async (req, res) => {
    console.log("signUpWorking");
    var { email } = req.body;

    let val = Joi.object({

        email: Joi.string().email().required(),

    });
    const result = val.validate(req.body);
    if (result.error) {
        return res.status(401).json({ "Error": result.error.details });
    }
    console.log(email);

    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',///enter email from email will be send
                pass: pass///enter your email's password
            }
        });
        //// Email Portion
        var mailOption = {
            from: '///enter email from the email will be send',
            to: email,
            subject: 'Please SignUp On Telemedicine',
            text: 'http://localhost:3000/api/test/'
        };

        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(`Email sent:${info.response}`);
            }
        });

        return res.status(200).json({ "ALERT": "The Mail Has Sent." });
    } catch (error) {

    }
});



module.exports = Route;