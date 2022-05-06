require("dotenv").config();

const mongoose = require("mongoose");

const db = process.env.DB;
const db_local = process.env.DATABASELOCAL;
const connection = mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log("connect 😍");
  })
  .catch((err) => {
    console.log("you lost connection or you have problem with database");
    res
      .status(401)
      .send("you lost connection or maybe you have problem on your database");
  });

module.exports = connection;
