const express = require("express");
const router = express.Router();
const {
  login,
  sign,
  protect,
  forgetPassword,
  resetPassword,
  updatePassword,
  get_users,
  restrict,
} = require("../authentication/userAuthentication");
const {
  updateMe,
  deleteUser,
  getMe,
} = require("../authentication/userController");
router.route("/sign").post(sign);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgetPassword);
router.route("/resetPassword").patch(resetPassword);
router.route("/updateMyPassword").patch(updatePassword);
router.route("/updateMe").patch(protect, updateMe);
router.route("/deleteme").delete(protect, deleteUser);
router.route("/getAll").get(protect, restrict("admin"), get_users);
router.route("/getme").get(protect, getMe);
module.exports = router;
