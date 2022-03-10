require("dotenv").config();
const route = require("express").Router();
const userModel = require("../Models/userSchema");
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
    error && console.log(error.details);
    //hashing password
    let hash = await hashPassword(req.body.password);
    // check email if exist in db
    let checkEmail = await userModel.findOne({ email: req.body.email });
    checkEmail && res.send("email exist before try with another one ");

    // create new user
    let user = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      isadmin: req.body.isadmin,
    });
    //save it in db
    await user.save();
    return res.send("thank you for registration");
  } catch (err) {
    console.log(err.message);
    return res.send(err.message);
    process.exit(1);
  }
});

route.post("/login", async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    !user && res.send("user doesn't exist").status(400);
    let { error } = await check_log_in(req.body);
    if (error) res.send("something wrong").status(401);
    let cmp = await compare(req.body.password, user.password);
    !cmp && res.send("wrong password try again please ").status(400);
    // create token

   /*   const access_token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isadmin,
      },
      process.env.SECRET_JWT
    );  */
    const { password, ...others } = user._doc;
//console.log(access_token);
    // send data wihtout password
    return res.send("fuck you");
  } catch (err) {
    return res.send(err).status(500);
    process.exit(1);
  }
});
module.exports = route;
