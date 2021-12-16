const express = require("express");
const Route = express.Router();
const multerMiddleware = require("../middlewares/multer");


Route.post("/api/upload", multerMiddleware.single("image"), async (req, res) => {
try {
    return res.status(true).json({"alert":"working"});
} catch (error) {
    return res.status(false).json({"ERROR":error});
}
});



module.exports = Route;