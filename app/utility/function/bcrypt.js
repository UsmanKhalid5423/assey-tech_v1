/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const bcrypt = require('bcryptjs');

/*******************************************************/
// Implementing Password Encryption & Comparison.
/*******************************************************/
const encryption = async (key, saltValue = 10) => {
   return await bcrypt.hash(key, saltValue);
}

const comparsion = async (requestPassword, storedPassword) => {
   return await bcrypt.compare(requestPassword, storedPassword);
}

/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
   encryption,
   comparsion
}