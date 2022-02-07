/*******************************************************/
// Assigning Endpoints to the Routes.
/*******************************************************/
module.exports = function (app) {
    app.use('/api/v1/assay/doctor', require('./doctor/doctor'));
    app.use('/api/v1/assay/doctor', require('./doctor/test'));
    app.use('/api/v1/assay/doctor', require('./doctor/lab'));
    app.use('/api/v1/assay/doctor', require('./doctor/patient'));

    app.use('/api/v1/assay/lab', require('./lab/lab'));
    app.use('/api/v1/assay/lab', require('./lab/test'));
    app.use('/api/v1/assay/patient', require('./patient/patient'));
    app.use('/api/v1/assay/patient', require('./patient/test'));
    app.use('/api/v1/assay/dashboard', require('./dashboard'));

    app.use('/api/v1/assay/admin', require('./admin/admin'));

    app.use('/api/v1/assay/admin', require('./admin/doctor'));


}



