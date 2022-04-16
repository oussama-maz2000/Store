const express = require("express");

const app = express();
const compression = require("compression");
const connection = require("./Models/connection");
const router=require('./Controllers/authentication/userAuthentication')
//const store = require("./Controllers/Routers/storeRoute");
const store = require("./Controllers/generators/storeGEN");

const { HandleError, golobaleEroor } = require("./Controllers/Error/HandleErr");
connection;
app.use(express.json());

app.listen(3001, console.log("server listening port 3001"));

app.use(compression());

app.use("/store", store);
app.use(router)
app.get("/", (req, res, next) => {
  res.status(200).send("welcome");
});
app.all("*", (req, res, next) => {
  next(new HandleError(`couldn't find ${req.originalUrl}`, 400));
});

app.use(golobaleEroor);
