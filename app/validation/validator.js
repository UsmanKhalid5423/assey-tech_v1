

/*******************************************************/
// Importing Files.
/*******************************************************/
// const validatingSchema = require("../../utility/function/validator")

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
// const joi = require('joi')

/*******************************************************/
// Declaring Variables.
/*******************************************************/
// let schema;

/*******************************************************/
// Applying Validations.
/*******************************************************/

const path = (req, res, next) => {
    console.log("WHY TF you are doing here?");
    if (req.params.id) {
        next();
    } else {
        next({
            code: 422,
            message: "VALIDATION_ERROR",
            data: "Id is required."
        });
    }
}

module.exports = {
    path
}
  

