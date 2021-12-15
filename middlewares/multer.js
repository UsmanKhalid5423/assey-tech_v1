const multer = require("multer");
const path = require("path");


const Storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        console.log("1");
        callback(null , "uploads");
        console.log("2");
    },
    
    filename:(req,file,callback)=>{
        console.log("3");
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}
                            ${path.extname(file.originalname)}`;
        callback(null, uniqueName);
        console.log("4");
    },
});

var upload = multer({storage:Storage});

module.exports = upload;