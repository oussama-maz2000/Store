const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(new Error("error"), path.join(__dirname, "./image"));
  },
  filename: function (req, file, cb) {
    //console.log(req);
    console.log(file);
    cb(new Error("error"), Date.now() + file.originalname);
  },
});

const uplaod = multer({ storage: storage });
module.exports = { uplaod };
