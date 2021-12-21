// const express = require("express");
// const Router = express.Router();
// const TestSchema = require("../models/testsSchema");
// const patientAccountsSchema = require("../models/userAccountSchema");
// const LabAccountsSchema = require("../models/userLabAccountSchema");
// const testOrder = require("../models/testOrderSchema");

// const Joi = require('joi');

// Router.get("/api/searchtest/", async (req, res) => {
//     console.log("SearchTest");
//     ///////////////////////////////////////////////////////
//     var {
//         email: email,
//         lab_email: lab_email,
//         test_name: test_name,
//         date: date } = req.body;

//     let val = Joi.object({
//         email: Joi.string().email().required(),
//         lab_email: Joi.string().email().required(),
//         test_name: Joi.string().min(2).max(15).required(),
//         date: Joi.string().required(),

//     });

//     const result = val.validate(req.body);
//     if (result.error) {
//         return res.status(401).json({ "Error": result.error.details });
//     }

//     /////////////////////////////////////////////////////////
//     try {
//         const patient = await patientAccountsSchema.findOne({ test_name });
//         if (patient) {
//             //////////////////////////////////

//             const lab = await LabAccountsSchema.findOne({ lab_email });
//             if (lab) {
//                 /////////////////////////////

//                 const test = await TestSchema.findOne({ test_name });
//                 if (test) {

//                     console.log(`Everythings here...${email},${lab_email},${test_name},${date},`);
//                     let Schema = await testOrder.create({
//                         email: email,
//                         lab_email: lab_email,
//                         test_name: test_name,
//                         date: date,
//                         byDr: process.env.user,
//                     });
//                     return res.status(201).json({ "Message": "Test order has been regestered" }, { "For: ": `${email}--On:${date}` });


//                 }
//                 else {
//                     return res.status(402).json({ "Message": "Test not in DataBase" });
//                 }

//                 ///////////////////////////
//             }
//             else {
//                 return res.status(402).json({ "Message": "Lab not in DataBase" });
//             }

//             ////////////////////////////////////
//         }
//         else {
//             return res.status(402).json({ "Message": "Patient not in DataBase" });
//         }

//     } catch (error) {
//         return res.status(402).json({ "Error from Test Search Try Catch": error });
//     }

// });

// module.exports = Router;

////////////////DrOrderWithIDnDate/////////////
const express = require("express");
const Router = express.Router();

const drAccountSchema = require("../models/userDrAccountSchema");
const drTestOrderSchema = require("../models/testOrderSchema");


const test = "COVID 19";


const Joi = require('joi');



Router.post("/api/drordertest/", async (req, res) => {


    ///////////////////////////////////////

    try {
        let userDrEmail = process.env.user;
        let found = await drAccountSchema.findOne({ email: userDrEmail });
        if (found) {

            let date = new Date().toISOString();
            let orderTest = drTestOrderSchema.create({
                id: found._id,
                test_name: test,
                date: date,
            });
            if (orderTest) { return res.status(200).json({ "ATERT": `Test Ordered Successfully by:${found.email}` }); }
            else { return res.status(401).json({ "Error": `Something went wrong,Test Order Failet` }); }

        }
        else { return res.status(401).json({ "ERROR": `Patient Not Found` }); }
    } catch (error) {

        return res.status(404).json({ "error": `process.env.user: is ${process.env.user}` });
    }






    return res.status(200).json({ "ATERT": `${process.env.user}` });
});


module.exports = Router;