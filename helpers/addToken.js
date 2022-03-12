const Jwt = require("jsonwebtoken");
require("dotenv").config();
async function add_Token(admin) {
  let access_token =  Jwt.sign(
    {
      _id: admin._id,
      isAdmin: admin.isadmin,
    },
    process.env.SECRET_JWT
  );
  return  access_token;
}

module.exports = { add_Token };
