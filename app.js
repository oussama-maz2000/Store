const express = require("express");
const app = express();
const connectDB = require("./Models/connection");
const routeUser = require("./Controllers/userAuthentication");
const store = require("./Controllers/Data/get_data");
const { err_handle, catch_error } = require("./Controllers/Error/HandleErr");
//const usr=require('./Routers/User/userRoute')
app.use(express.json());
connectDB;
app.listen(3000, console.log("server listening port 3000"));
/* app.use((req, res, next) => {
  console.log("middleware 1 called");
  console.log(req.path);
  next();
}); */
app.use(routeUser);
app.use("/store", store);
app.use(catch_error);
app.use(err_handle);

//app.use('/usr',usr)
app.get("/", (req, res) => {
  res.send("welcome 🙌 ");
});
