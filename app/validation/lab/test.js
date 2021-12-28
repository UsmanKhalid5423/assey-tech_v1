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
    testStatus: joi.string().valid('sent', 'completed').required(),
    result: joi.string().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}


module.exports = {
  add,

}