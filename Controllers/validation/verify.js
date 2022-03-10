const jwt = require("jsonwebtoken");
require("dotenv").config();
// middelware to check the token
const verify_token = (req, res, next) => {
  let token = (req.headers || req.query || req.body.token)
  //console.log(token);
  if (!token.token)
    return res.status(401).send("a token is required for authentication");
  try {
    let decode = jwt.verify(token, process.env.SECRET_JWT);
    console.log(decode);
    req.user = decode;
  } catch (error) {
    console.log("err", error.message);
  }
  return next();
};

const verify_and_authorizate = (req, res, next) => {
  verify_token(req, res, () => {
    if (req.user.id === req.params.id || req.user.isadmin) {
      next();
    } else {
      return res.send("you are not authorizate");
    }
  });
};
module.exports = { verify_token, verify_and_authorizate };
