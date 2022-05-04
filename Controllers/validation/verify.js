const jwt = require("jsonwebtoken");
require("dotenv").config();
// middelware to check the token
const verify_token = (req, res, next) => {
  //let token = req.headers || req.query || req.body.token;
  var token = req.headers.authorization.split(" ")[1];
  if (!token)
    return res.status(401).send("a token is required for authentication");
  try {
    let decode = jwt.verify(token, process.env.SECRET_JWT);
    //req.user = decode;
    next();
  } catch (error) {}
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
