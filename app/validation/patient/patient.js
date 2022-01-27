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
    fullName: joi.string().required(),
    email: joi.string().email().required(),
    age: joi.number().required(),
    phoneNumber: joi.string().required(),
    password: joi.string().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)


}



const profile = (req, res, next) => {
    schema = joi.object().keys({
      gender: joi.string().valid('male', 'female', 'other').required(),
      dateOfBirth: joi.date().required(),
      insurence_Info: joi.string().required(),
      genetic_Disease: joi.string().required(),
      address: joi.string().required(),
    })
  
    validatingSchema.joiValidator(req.body, schema, next)
   
}

const login = (req, res, next) => {
  schema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })

  validatingSchema.joiValidator(req.body, schema, next)
}
const createPatientOrderTestVS = (req,res,next)=> {
  schema = joi.object().keys({
    patient_name: joi.string().required(),
    patient_phone: joi.string().required(),
    patient_address: joi.string().required(),
    test_name: joi.string().required(),
    date: joi.string().required(),
  })
  validatingSchema.joiValidator(req.body, schema, next)
}

module.exports = {
  add,
  profile,
  login,
  createPatientOrderTestVS
}