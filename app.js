const express = require("express");
const app = express();
const connectDB = require("./Models/connection");
app.use(express.json());
const start = async () => {
  try {
    app.listen(3000, console.log("server listening port 3000"));
    await connectDB;
  } catch (error) {
    console.log(error.message);
  }
};

start();
