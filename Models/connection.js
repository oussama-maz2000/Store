require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.DB;
const connection = mongoose
  .connect(db)
  .then((result) => {
    console.log("connect with db");
  })
  .catch((err) => {
    console.log("failed");
  });
module.exports=connection