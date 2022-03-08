const express = require("express");
const app = express();
const connectDB = require("./Models/connection");
const routeUser = require("./Controllers/userAuthentication");
app.use(express.json());
connectDB;
app.listen(3000, console.log("server listening port 3000"));

app.use("/user", routeUser);

app.get("/", (req, res) => {
  res.send("hello world");
});
