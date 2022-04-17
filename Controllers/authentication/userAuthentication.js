require("dotenv").config();
const { userModel } = require("../../Models/userSchema");
const jwt = require("jsonwebtoken");
const { HandleError } = require("../Error/HandleErr");
const {
  check_log_in,
  check_Sign_up,
  compare,
  hashPassword,
} = require("../validation/userValid");
const sign = async (req, res, next) => {
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
    res.status(400).send(err.message);
  }
};

const login = async (req, res, next) => {
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
    res.status(400).send(err.message);
  }
};

const protect = async (req, res, next) => {
  let token;
  //getting the token and cheack is here
  if (req.headers.token && req.headers.token.startsWith("token")) {
    token = req.headers.token.split(" ")[1];
    console.log(token);
  }
  
  if (!token) {
    return next(new HandleError("you are not logged please log in ", 401));
  }

  next();
};

module.exports = { login, sign, protect };
