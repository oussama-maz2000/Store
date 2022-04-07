const express = require("express");
const serverless = require("serverless-http");
const app = express();
const compression = require("compression");
const connectDB = require("./Models/connection");

const store = require("./Controllers/Data/get_data");
const { HandleError, golobaleEroor } = require("./Controllers/Error/HandleErr");

app.use(express.json());
connectDB;
app.listen(3001, console.log("server listening port 3001"));

app.use(compression());

app.use("/store", store);

app.get("/", (req, res, next) => {
  res.status(200).send("welcome");
});
app.all("*", (req, res, next) => {
  next(new HandleError(`couldn't find ${req.originalUrl}`, 400));
});

app.use(golobaleEroor);
module.exports.handler = serverless(app);
