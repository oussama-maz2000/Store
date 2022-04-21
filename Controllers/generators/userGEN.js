const express = require("express");
const router = express.Router();
const {
  login,
  sign,
  protect,
  forgetPassword
} = require("../authentication/userAuthentication");
router.route("/sign").post(sign);
router.route("/login").post(login);
router.route("/forgot").post(forgetPassword);


module.exports = router;
