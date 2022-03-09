const jwt = require("jsonwebtoken");
require("dotenv").config();
// middelware to check the token
const verify_token = (req, res, next) => {
  let authHeader = req.header.token;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_JWT, (err, user) => {
      if (err) return res.status(403).json({ err: "token not valide" });
      req.user = user;
      next();
    });
  } else {
    return res.send(401).json({ err: "you're not authorized" });
  }
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
