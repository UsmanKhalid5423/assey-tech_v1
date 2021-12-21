const multer = require("multer");
const path = require("path");





const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("1", req.body);
        console.log("11", file);
        callback(null, 'uploads');
        console.log("2");
    },

    filename: (req, file, callback) => {
        console.log("3", req);
        const uniqueName = `${Date.now()}-${path.extname(file.originalname)}`;
        console.log(uniqueName)
        callback(null, uniqueName);
        console.log("4", uniqueName);
    },
});

var upload = multer({ storage: Storage });

module.exports = upload;