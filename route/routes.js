const express = require("express");
const app = express();
///////////////////////////////////////////////////////////////////////


///////Registration Routes////////////////////////
const testRoute = require("../controllers/testRoute");
const DrRegisRoute = require("../controllers/drRegis");
const LabRegisRoute = require("../controllers/LabRegis");

///////Login Routes////////////////////////

const loginRoute = require("../controllers/patientDashboard/loginUser");
const loginDrRoute = require("../controllers/drLogin");
const loginLabRoute = require("../controllers/LabDashboard/labDashboard");

///////Forget Password Routes////////////////////////
const forgetPasswordRoute = require("../controllers/forgetPassword");
const drforgetPasswordRoute = require("../controllers/drForgetPassword");
const labforgetPasswordRoute = require("../controllers/labForgetPassword");


///////Home Route////////////////////////
const homeRoute = require("../controllers/home");

///////////logout/////////////////////////////
const logout = require("../controllers/logout");

///////////DrExtraProfile/////////////////////////////
const DrExtraProfile = require("../controllers/drExtraProfile");
/////////////upload////////////
const upload = require("../controllers/upload");

/////////////DrSearchPatient////////////
const DrSearchPatient = require("../controllers/drSearchPatient");

///////SendSighUpLink////////////////////////
const SendSighUpLink = require("../controllers/sendSignUpLink");


///////SendSighUpLinkToLAB////////////////////////
const SendSighUpLinkLab = require("../controllers/sendSighUpLinkLab");


///////DrSearchLab////////////////////////
const DrSearchLab = require("../controllers/DrSearchLab");

///////DrSearchLab////////////////////////
const EnterTest = require("../controllers/enterTests");

///////SearchTest////////////////////////
const OrderTests = require("../controllers/orderTests");

///////labReportUpload////////////////////////
const labReportUpload = require("../controllers/labAdmin");

///////DrReportSearch////////////////////////
const DrReportSearch = require("../controllers/searchReports");


///////PatientExtraProfileRegis////////////////////////
const PatientExtraProfileRegis = require("../controllers/patientDashboard/patientExtraProfile");

///////PatientOrderTest////////////////////////
const PatientOrderTest = require("../controllers/patientDashboard/orderTestByPatient");


///////PatientReportSearch////////////////////////
const PatientReportSearch = require("../controllers/searchReports");


///////labRegisProfile////////////////////////
const labRegisProfile = require("../controllers/LabDashboard/labExtraProfile");


///////showOrder////////////////////////
const showOrder = require("../controllers/LabDashboard/showOrderToBeProcessed");
















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

app.use(homeRoute);

app.use(logout);

app.use(DrExtraProfile);

app.use(upload);

app.use(DrSearchPatient);

app.use(SendSighUpLink);

app.use(DrSearchLab);

app.use(SendSighUpLinkLab);

app.use(EnterTest);

app.use(OrderTests);

app.use(labReportUpload);

app.use(DrReportSearch);

app.use(PatientExtraProfileRegis);

app.use(PatientOrderTest);

app.use(PatientReportSearch);

app.use(labRegisProfile);

app.use(showOrder);



module.exports = app;