const express = require("express");
const app = express();
const compression = require("compression");
const connectDB = require("./Models/connection");
const routeUser = require("./Controllers/userAuthentication");
const store = require("./Controllers/Data/get_data");
const { err_handle, catch_error } = require("./Controllers/Error/HandleErr");

app.use(express.json());
connectDB;
app.listen(3000, console.log("server listening port 3000"));

app.use(compression());
app.use(routeUser);
app.use("/store", store);

app.get("/", (req, res, next) => {
  res.status(200).send("welcome");
});
app.use("*", (req, res, next) => {
  res.status(404).send("page not found");
});
app.use(catch_error);
app.use(err_handle);
//app.use('/usr',usr)
