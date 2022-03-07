const route = require("express").Router();
const userModel = require("../Models/userSchema");
const bcrypt = require("bcryptjs");
route.post("/signup", async (req, res) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    let compare = bcrypt.compareSync(req.body.password, hash);
    console.log(compare);
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    let user = new userModel(newUser);
    console.log(user);
    //await user.save();
    res.send("fuck you ");
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = route;
