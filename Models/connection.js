require("dotenv").config();
const res = require("express/lib/response");
const mongoose = require("mongoose");

const db = process.env.DB;
const connection = mongoose
  .connect(db,  {
    useNewUrlParser: true,
   
  } )
  .then((result) => {
    console.log("connect with db");
  })
  .catch((err) => {
    console.log("you lost connection or you have problem with database");
    res.status(401).send("you lost connection or you have problem with database");
  });
module.exports = connection;
