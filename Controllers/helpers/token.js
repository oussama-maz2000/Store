const jwt = require("jsonwebtoken");
require("dotenv").config();
const createSendToken = (user, statuscode, res) => {
  const token = signToken(user._id);
  //how to send token via cookie
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.TOKEN_COOKIE * 24 * 60 * 60 * 1000
    ),
    //secure :true    use it when you want the https secure
    httpOnly: true,
  });

  res.status(statuscode).json({
    stuatus: "success",
    token,
    data: { user },
  });
};
const signToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.SECRET_JWT);
  return token;
};
module.exports = { createSendToken };
