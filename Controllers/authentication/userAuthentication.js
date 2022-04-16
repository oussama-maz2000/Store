require("dotenv").config();
const route = require("express").Router();
const { userModel } = require("../../Models/userSchema");
const { verify_token } = require("../validation/verify");
const { add_Token } = require("../../helpers/addToken");
const jwt = require("jsonwebtoken");
//const {HandleError }= require("./Error/HandleErr");
const {
  check_log_in,
  check_Sign_up,
  compare,
  hashPassword,
} = require("../validation/userValid");
route.post("/signup", async (req, res, next) => {
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
    let user = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isadmin: req.body.isadmin,
    });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
      expiresIn: 100000,
    });
    //save it in db
    await user.save();
    return res.status(200).json({
      status: "success",
      user: user,
      token: token,
    });
  } catch (err) {
    /* let error = new HandleError(401, err.message);
    next(error); */
    res.status(400).send(err.message);
  }
});

route.post("/login", async (req, res, next) => {
  try {
    let { error } = await check_log_in(req.body);
    if (error) return res.status(401).send("something wrong");
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("user doesn't exist");
    let cmp = await compare(req.body.password, user.password);
    if (!cmp) return res.status(401).send("wrong password try again please ");
    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
      expiresIn: 100000,
    });
    return res
      .status(200)
      .json({ status: "success", user: user, token: token });
  } catch (err) {
    /*   let error = new HandleError(401, err.message);
    next(error); */
    res.status(400).send(err.message);
  }
});

module.exports = route;
