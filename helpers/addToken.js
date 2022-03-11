const Jwt = require("jsonwebtoken");
const {userModel} = require("../Models/userSchema");
require("dotenv").config();
async function add_Token(admin) {
  let access_token = Jwt.sign(
    {
      _id: admin._id,
      isAdmin: admin.isadmin,
    },
    process.env.SECRET_JWT
  );
  let query = { username: admin.username };
  let data = { token: access_token };
  let new_token = await userModel.findOneAndUpdate(query, data, {
    new: true,
  });
  await new_token.save();
}

module.exports={add_Token}