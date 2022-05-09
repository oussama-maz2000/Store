const express = require("express");
const app = express();
const compression = require("compression");
const connection = require("./Models/connection");
const user = require("./Controllers/generators/userGEN");
const store = require("./Controllers/generators/storeGEN");
const ratelimiter = require("express-rate-limit");
const sanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const { HandleError, golobaleEroor } = require("./Controllers/Error/HandleErr");
// securite
app.use(helmet());
connection;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//how to impliment rate limiter
const limiter = ratelimiter({
  max: 50,
  windowMs: 60 * 1000,
  message: "too many requests from this IP, try again after one hour🤪",
});
app.use("/store", limiter);
//data sanitization against nosql query injection
app.use(sanitize());

//data sanitization against xss
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["price"], //you can put fields into array
  })
);
app.listen(3001, console.log("server ON😎"));

app.use(compression());

app.use("/usr", user);
app.use("/store", store);
app.get("/", (req, res, next) => {
  res.status(200).send("welcome");
});
/* app.get("*", (req, res, next) => {
  next(new HandleError(`couldn't find ${req.originalUrl}`, 400));
}); */

app.use(golobaleEroor);
