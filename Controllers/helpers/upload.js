const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, "./image");
    } catch (error) {
      console.log(error.stack);
    }
  },
  filename: (req, file, cb) => {
    try {
      console.log("from upload", req.user);
      let code = Math.floor(Date.now() / 10000000);
      cb(null, req.user.username + " - " + code + " - " + file.originalname);
    } catch (error) {
      console.log(error.message);
    }
  },
});

const uplaod = multer({ storage: storage });
module.exports = { uplaod };
