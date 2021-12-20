const express = require("express");
const Route = express.Router();

const patientTestOrdersSchema = require("../../models/patientModels/patientTestOrderSchema");
const DrTestOrdersSchema = require("../../models/testOrderSchema");

Route.get("/api/showOrders/", async (req, res) => {
    console.log("showOrders");
    try {
        const patientOrders = await patientTestOrdersSchema.find();
        const DrOrders = await DrTestOrdersSchema.find();
        var total = patientOrders + DrOrders;
        console.log(total);
        return res.status(201).json({ 'Orders': `${total}` });
    } catch (error) {
        return res.status(404).json({ 'ERROR': error });
    }
});

module.exports = Route;