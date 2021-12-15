const express = require("express");
const Route = express.Router();
const multerMiddleware = require("../middlewares/multer");


Route.post("/api/upload", multerMiddleware.single("file"), async (req, res) => {
console.log(req.file);
});



module.exports = Route;