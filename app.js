const express = require("express");
const app = express();
const connectDB = require("./Models/connection");
const routeUser = require("./Controllers/userAuthentication");
const {verify_token} = require("./Controllers/validation/verify");
//const usr=require('./Routers/User/userRoute')
app.use(express.json());
connectDB;
app.listen(3000, console.log("server listening port 3000"));

app.use( routeUser);
//app.use('/usr',usr)
app.get("/", verify_token, (req, res) => {
  res.send("welcome 🙌 ");
});
