/*******************************************************/
// Importing Files.
/*******************************************************/
const constantEn = require("../locals/constantEnglish");
/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
require("dotenv").config();

/*******************************************************/
// Returning Response.
/*******************************************************/
const send = (req, res, next, level, code, message, data, status) => {
  const responseMessage = constantEn(message);
  let responseStatus;
  if (status) {
    responseStatus = status;
  } else {
    responseStatus =
      level === "info"
        ? process.env.RESPONSE_SUCCESS
        : process.env.RESPONSE_ERROR;
  }
  const response = {
    code: code,
    status: responseStatus,
    message: responseMessage,
    data: data,
  };
  return res.status(code).json(response);
};

const download = (req, res, next, contentType, fileName, data) => {
  res.setHeader("Content-disposition", "attachment; filename=" + fileName);
  res.set("Content-Type", contentType);
  res.status(200).send(data);
};

const sendHTML = (html, res) => {
  res.status(200).send(html);
}

const redirect = (res, link) => {
  res.redirect(link);
}


/*******************************************************/
// Exporting Funtions.
/*******************************************************/
module.exports = {
  send,
  download,
  sendHTML,
  redirect
};
