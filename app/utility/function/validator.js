/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const joi = require("joi");

/*******************************************************/
// Implementing Helper/Common  Functions.
/*******************************************************/
const joiValidator = (data, scehma, next) => {
  joi.validate(
    data,
    scehma,
    {
      allowUnknown: true
    },
    err => {
      if (err) {
        next({
          code: 422,
          message: "VALIDATION_ERROR",
          data: err.details[0].message
        });
      } else {
        next();
      }
    }
  );
};

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  joiValidator
};
