require("dotenv").config();
const route = require("express").Router();
const { userModel } = require("../Models/userSchema");
const { verify_token } = require("./validation/verify");
const { add_Token } = require("../helpers/addToken");
const jwt = require("jsonwebtoken");
const {
  check_log_in,
  check_Sign_up,
  compare,
  hashPassword,
} = require("./validation/userValid");
route.post("/signup", async (req, res) => {
  try {
    //check validation
    let { error } = await check_Sign_up(req.body);
    if (error) return res.status(401).send(error.details[0]);
    //hashing password
    let hash = await hashPassword(req.body.password);
    // check email if exist in db
    let checkEmail = await userModel.findOne({ email: req.body.email });
    if (checkEmail)
      return res.status(400).send("email exist before try with another one ");

    // create new user
    let user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isadmin: req.body.isadmin,
    });
    //save it in db
    await user.save();
    return res.status(200).send("thank you for registration");
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(err.message);
  }
});

route.post("/login", async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("user doesn't exist");
    let { error } = await check_log_in(req.body);
    if (error) return res.status(401).send("something wrong");
    let cmp = await compare(req.body.password, user.password);
    if (!cmp) return res.status(401).send("wrong password try again please ");

    // create token
    /* if (user.isadmin == true && !user.token) {
      add_Token(user);
    } */

    let token = await add_Token(user);
    return res.status(200).json({ token, user });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

/* route.put("/ou", verify_token, (req, res) => {
  res.send("welcome 🙌");
}); */
module.exports = route;
