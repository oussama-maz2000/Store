const express = require("express");
const router=express.Router();

const { get_All } = require("../Routers/storeRoute");

router.route("/").get(get_All);

module.exports = router;
