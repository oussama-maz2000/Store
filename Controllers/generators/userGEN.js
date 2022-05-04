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
const { updateMe } = require("../authentication/userController");
router.route("/sign").post(sign);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgetPassword);
router.route("/resetPassword").patch(resetPassword);
router.route("/updateMyPassword").patch(updatePassword);
router.route("/updateMe").patch( updateMe);

module.exports = router;
