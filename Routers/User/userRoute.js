const route = require("express").Router();
const hashPassword = require("../../Controllers/validation/userValid");
const userModel = require("../../Models/userSchema");

const {
  verify_token,
  verify_and_authorizate,
} = require("../../Controllers/validation/verify");
route.put("/:id", verify_and_authorizate, async (req, res) => {
  if (req.body.password) {
    hashPassword(req.body.password);
  }
  try {
    let updateuser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.send(updateuser)
  } catch (error) {
    res.status(401).json(error);
  }
});
module.exports=route