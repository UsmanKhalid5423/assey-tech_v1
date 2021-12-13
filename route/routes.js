const express = require("express");
const app = express();
//////////////////////////////////////////////////


const testRoute = require("../controllers/testRoute");
const loginRoute = require("../controllers/loginUser");
const DrRegisRoute = require("../controllers/drRegis");
const LabRegisRoute = require("../controllers/LabRegis");
const loginDrRoute = require("../controllers/drLogin");
const loginLabRoute = require("../controllers/labLogin");


///////////////////////////////////////////////////
app.use(testRoute);
app.use(loginRoute);
app.use(DrRegisRoute);
app.use(LabRegisRoute);
app.use(loginDrRoute);
app.use(loginLabRoute);





module.exports = app;