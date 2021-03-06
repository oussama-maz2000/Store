const { userModel } = require("../../Models/userSchema");
const { HandleError } = require("../Error/HandleErr");
const { validUpdate } = require("../validation/userValid");
const jwt = require("jsonwebtoken");

const updateMe = async (req, res, next) => {
  // 1) create error if user post password data
  if (req.body.password)
    return next(
      new HandleError(
        "This route is not for password update please use /updateMyPassword ",
        401
      )
    );
  // 2)Update the user document
  let user = req.user;
  // 2.3) check if the data input is correct
  try {
    const validation = await validUpdate(req.body);
    // 2.3) check if email exict before in db
    const checkEmail = await userModel.findOne({ email: req.body.eamil });
    if (checkEmail) return next(new HandleError("email existed before", 402));
    //3) updating
    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role || "user";
    await user.save();
    res.status(200).json({
      stuatus: "success",
      message: "updating done ...",
      user,
    });
  } catch (error) {
    res.status(400).send(error.details[0].message);
  }
};

const deleteUser = async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.user.id, { isactive: false });
  res.status(204).json({ stuatus: "succes", data: null });
};

const getMe = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.status(200).json({ stuatus: "seccuss", data: user });
  } catch (error) {
    next(new HandleError(`there is error ${error.messsage}`, 404));
  }
};
module.exports = { updateMe, deleteUser, getMe };
