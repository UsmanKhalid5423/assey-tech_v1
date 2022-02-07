/*******************************************************/
// Assigning Endpoints to the Routes.
/*******************************************************/
module.exports = function (app) {
    // <!-------------------------- for doctor by usman --------------------------!>
    app.use('/api/v1/assay/doctor', require('./doctor/doctor'));
    app.use('/api/v1/assay/doctor', require('./doctor/test'));
    app.use('/api/v1/assay/doctor', require('./doctor/lab'));
    app.use('/api/v1/assay/doctor', require('./doctor/patient'));
    // <!-------------------------- for doctor by usman --------------------------!>


    // <!-------------------------- for lab by usman --------------------------!>
    app.use('/api/v1/assay/lab', require('./lab/lab'));
    app.use('/api/v1/assay/lab', require('./lab/test'));
    app.use('/api/v1/assay/patient', require('./patient/patient'));
    app.use('/api/v1/assay/patient', require('./patient/test'));
    app.use('/api/v1/assay/dashboard', require('./dashboard'));
    // <!-------------------------- for lab by usman --------------------------!>

    // <!-------------------------- for admin by usman --------------------------!>
    app.use('/api/v1/assay/admin', require('./admin/admin'));
    app.use('/api/v1/assay/admin', require('./admin/doctor'));
    app.use('/api/v1/assay/admin', require('./admin/lab'));
    //<!-------------------------- for admin by usman --------------------------!>

    // ahmad iqbal routes
    app.use('/api/v1/assay/general', require('./general'));

}



