/*******************************************************/
// Importing Npm Modules.
/*******************************************************/
const multer = require("multer");
const mime = require("mime-types");
require("dotenv").config();
/*******************************************************/
// Defining Variables.
/*******************************************************/

/*******************************************************/
// Uploading File to S3 Bucket.
/*******************************************************/
const storage = multer.diskStorage({
    // destination:'./uploadimages/',
    destination:(req,file,cb)=>{
        return cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
        return cb(null,file.fieldname +Date.now()+"." + mime.extension(file.mimetype))
    }
});

const uplaod=multer({
    storage:storage,
})
     
     
/*******************************************************/
// Exporting Multer Module.
/*******************************************************/
module.exports={
  uploadimg: uplaod
};
