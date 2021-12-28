/*******************************************************/
// Importing Files.
/*******************************************************/
const validatingSchema = require("../../utility/function/validator")

/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const joi = require('joi')

/*******************************************************/
// Declaring Variables.
/*******************************************************/
let schema;

/*******************************************************/
// Applying Validations.
/*******************************************************/
const add = (req, res, next) => {
  schema = joi.object().keys({
    patientId: joi.string().required(),
    labId: joi.string().required(),
    testName: joi.string().required(),
    date: joi.date().required(),
    testStatus: joi.string().valid('sent', 'completed').required(),

  })

  validatingSchema.joiValidator(req.body, schema, next)


}


module.exports = {
  add,
}