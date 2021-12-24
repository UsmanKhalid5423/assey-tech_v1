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
    lab_name: joi.string().required(),
    email: joi.string().email().required(),
    phone_number: joi.string().required(),
    //phoneNumber: joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required(),
    password: joi.string().required(),
    startDate: joi.date().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}


const profile = (req, res, next) => {
  schema = joi.object().keys({
    licNumber: joi.string().required(),
    address: joi.string().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}


module.exports = {
  add,
  profile
}