const crypto = require("crypto");
require("dotenv").config();
const { userModel } = require("../../Models/userSchema");
const jwt = require("jsonwebtoken");
const { HandleError } = require("../Error/HandleErr");
const {
  check_log_in,
  check_Sign_up,
  compare,
  hashPassword,
  validPassword,
} = require("../validation/userValid");
const sendEmail = require("../helpers/email");
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
      role: req.body.role,
    });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT, {
      expiresIn: "1h",
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
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_JWT,
      {
        expiresIn: "24h",
      }
    );
    return res
      .status(200)
      .json({ status: "success", user: user, token: token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
//protect function it's midleware
const protect = async (req, res, next) => {
  let token, decoded;

  //getting the token and cheack is here
  if (req.headers.token && req.headers.token.startsWith("token")) {
    token = req.headers.token.split(" ")[1];
    console.log("token :", token);
  }

  if (!token) {
    return next(new HandleError("you are not logged please log in ", 401));
  }

  // verify token
  let verification_token = jwt.verify(
    token,
    process.env.SECRET_JWT,
    (err, dec) => {
      if (err) {
        return next(new HandleError(err.message, 403));
      }
      decoded = dec;
      console.log("decoded :", decoded);
    }
  );

  //cheack if user still exist or no
  const freshUser = await userModel.findById(decoded.id);
  if (!freshUser) {
    return next(new HandleError("user with this token does no exist ", 402));
  }
  console.log("freshUser :", freshUser);
  req.user = freshUser;

  next();
};

const restrict = (...roles) => {
  return (req, res, next) => {
    //console.log(roles); --> to get roles from restrict ['user'or'admin']

    if (req.user.role != "admin") {
      return next(
        new HandleError("sorry you're user don't have permission ", 402)
      );
    }
    next();
  };
};

const forgetPassword = async (req, res, next) => {
  //1-get user from posted email
  const user = await userModel.findOne({ email: req.body.email });
  if (!user)
    return next(new HandleError("there is no user with email address", 404));

  // 2/generate the random reset token
  //we use (user.creaet_Rest_Password_token) to acces it from model db
  const reset_token = user.create_Rest_Password_token();
  user.save({ ValidateBeforeSave: false });
  // (ValidateBeforeSave: false) we use it to ignore the error of validtion error if it's not true

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/usr/resetpassword/${reset_token}`;

  const message = `you fogot password? submit your patch request with new password and confirmpassword in ${resetURL}`;
  try {
    await sendEmail({
      email: user.email,
      subject: message,
    });
    res.status(200).json({
      status: "succuess",
      message: "token send in mail",
    });
  } catch (err) {
    user.passwordRestToken = undefined;
    user.passwordRestExpires = undefined;
    user.save({ ValidateBeforeSave: false });
    return next(new HandleError(`there is error ${err.messsage}`, 404));
  }
};

const resetPassword = async (req, res, next) => {
  /**
   * <> Get user based on reset token from the forgetPassword route
   * ! if token is invalid or expired we send error
   */
  const resetoken = req.query.resetoken.split(" ")[1];
  const cryp_token = crypto
    .createHash("sha256")
    .update(resetoken)
    .digest("hex");
  console.log(cryp_token);
  const user = await userModel.findOne({
    passwordRestToken: cryp_token,
  });
  console.log(user);
  if (!user) return next(new HandleError("token is invalid or expired", 400));
  let { error } = await validPassword(req.body);
  if (error) {
    return res.status(401).send(error.details[0]);
  }
  /* let hashpassword = await hashPassword(password);
  console.log(hashpassword); */

  res.status(200).send(cryp_token);
};

module.exports = {
  login,
  sign,
  protect,
  restrict,
  forgetPassword,
  resetPassword,
};
