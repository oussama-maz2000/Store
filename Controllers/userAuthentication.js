const route = require("express").Router();
const userModel = require("../Models/userSchema");
route.post("/signup", async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    let user = new userModel(newUser);
    console.log(user);
    await user.save();
    res.send("fuck you ");
  } catch (err) {
    res.send(err.message);
  }
});
module.exports = route;
