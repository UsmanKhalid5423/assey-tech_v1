/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const nodemailer = require("nodemailer");
require("dotenv").config();

/*******************************************************/
//Defining variables.
/*******************************************************/
let email, password, supportEmail;
switch (process.env.ENV) {
    case "development":
        email = process.env.PROVIDER_EMAIL_DEVELOPMENT
        password = process.env.PROVIDER_EMAIL_PASSWORD_DEVELOPMENT
        break;
    case "staging":
        email = process.env.PROVIDER_EMAIL_STAGING
        password = process.env.PROVIDER_EMAIL_PASSWORD_STAGING
        break;
    case "production":
        email = process.env.PROVIDER_EMAIL_PRODUCTION
        password = process.env.PROVIDER_EMAIL_PASSWORD_PRODUCTION
        break;
}

/*******************************************************/
//Email service.
/*******************************************************/


const dispatchEmail_v3 = (subject,body,userEmail) => {
    let receipents = [];
    //receipents.push(receiverEmail, email)

    receipents.push(userEmail)

    console.log("Email section ===== >> called ");


    // const transporter = nodemailer.createTransport({
    //     // host: 'smtp.gmail.com',
    //     service: 'noreply',
    //     secure: true,
    //     port: 565,
    //     auth: {
    //         user: email,
    //         pass: password
    //     },
    // });


    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        // tls: {
        //    ciphers:'SSLv3'
        // },
        secure: false,
        auth: {
            user: email,
            pass: password
        }
    });
    


    const mailOptions = {
        from: email,//'"Danetka"' + '<' + email + '>',
        to: receipents,
        subject: subject,
        html: body
    };
    console.log("?");
    transporter.sendMail(mailOptions, function (error, info) {
        console.log("Email section.");
        if (error) {
            console.log("IN THE ERROR.");
            console.log(error);
            console.log(info);
        } else {
            console.log("Email sent: " + info.response);
            
        }
    });
}




/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
    dispatchEmail_v3
};