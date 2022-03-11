const express = require("express");
const app = express();
const connectDB = require("./Models/connection");
const routeUser = require("./Controllers/userAuthentication");
const store = require("./Controllers/Data/get_data");

//const usr=require('./Routers/User/userRoute')
app.use(express.json());
connectDB;
app.listen(3000, console.log("server listening port 3000"));

app.use(routeUser);
app.use("/store", store);
//app.use('/usr',usr)
app.get("/", (req, res) => {
  res.send("welcome 🙌 ");
});
