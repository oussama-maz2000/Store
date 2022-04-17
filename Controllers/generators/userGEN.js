const express = require("express");
const router = express.Router();
const {
  login,
  sign,
  protect,
} = require("../authentication/userAuthentication");
router.route("/sign").post(sign);
router.route("/login").post(protect, login);

module.exports = router;