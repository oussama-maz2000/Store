const express = require("express");
const router = express.Router();
const {
  login,
  sign,
  protect,
  forgetPassword,
  resetPassword,
  updatePassword,
} = require("../authentication/userAuthentication");
router.route("/sign").post(sign);
router.route("/login").post(login);
router.route("/forgot").post(forgetPassword);
router.route("/reset").patch(resetPassword);
router.route("/update").patch(updatePassword);

module.exports = router;
