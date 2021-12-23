/*******************************************************/
// Importing Files.
/*******************************************************/
const constantEn = require("./app/utility/locals/constantEnglish");
const mongoose = require("./database/mongoose");

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

/*******************************************************/
// Configuring Application.
/*******************************************************/
const app = express();
const options = {
    optionsSuccessStatus: 200
};
app.use(cors(options));
app.options('*', cors(options));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//app.use(appLanguage());
//app.use('/uploads', express.static(__dirname + '/logs'));

app.use('/uploads', express.static(__dirname + '/uploads'));


/*******************************************************/
// Configuring Server.
/*******************************************************/
const server = app.listen(process.env.PORT, function () {
    console.log("Node application is listening at " + process.env.PORT + " port.");
});


/*******************************************************/
// Incoming Requests.
/*******************************************************/
app.use(function (req, res, next) {
    const allowedMethods = ["GET", "POST", "PATCH", "PUT", "DELETE"];
    const method = String(req.method).trim().toUpperCase();
    if (method === "OPTIONS") {
        return res.status(200).end();
    } else if (allowedMethods.toString().indexOf(method) < 0) {
        return next(404);
    }
    return next();
});

/*******************************************************/
// Assigning Endpoints to the Routes.
/*******************************************************/

/**
 * Routes
 */
//app.use('/api/v1/doctor', require('./app/routes/index'));

require("./app/routes/index")(app);


//http://localhost:3000/api/test/

// app.get('/api/test',(req,res,next)=>{
//     res.send('hello')
// });


/*******************************************************/
// Handling Errors.
/*******************************************************/
app.use((req, res, next) => {
    next({
        code: 404,
        message: "ROUTE_NOT_AVAILABLE"
    })
});


app.use((error, req, res, next) => {
    console.log(error);
    console.log("in the last block of the application middleware.")
    const responseMessage = constantEn(error.message);
    // const responseMessage = (req.appLanguage === "en") ? constantEn(error.message) : constantNor(error.message);
    const response = {
        code: error.code,
        status: process.env.RESPONSE_ERROR,
        message: responseMessage,
        data: error.data || null
    }
    return res.status(error.code).json(response);
});

/*******************************************************/
// Exporting Modules.
/*******************************************************/