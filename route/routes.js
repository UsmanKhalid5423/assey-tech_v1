const express = require("express");
const app = express();
///////////////////////////////////////////////////////////////////////


///////Registration Routes////////////////////////
const testRoute = require("../controllers/testRoute");
const DrRegisRoute = require("../controllers/drRegis");
const LabRegisRoute = require("../controllers/LabRegis");

///////Login Routes////////////////////////

const loginRoute = require("../controllers/loginUser");
const loginDrRoute = require("../controllers/drLogin");
const loginLabRoute = require("../controllers/labLogin");

///////Forget Password Routes////////////////////////
const forgetPasswordRoute = require("../controllers/forgetPassword");
const drforgetPasswordRoute = require("../controllers/drForgetPassword");
const labforgetPasswordRoute = require("../controllers/labForgetPassword");

///////////////////////////////////////////////////////////////////////
app.use(testRoute);
app.use(loginRoute);
app.use(DrRegisRoute);
app.use(LabRegisRoute);
app.use(loginDrRoute);
app.use(loginLabRoute);
app.use(forgetPasswordRoute);
app.use(drforgetPasswordRoute);
app.use(labforgetPasswordRoute);








module.exports = app;