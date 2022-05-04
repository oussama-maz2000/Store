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
  let token, decUser;

  // 2.1) get user from his token
  token = req.query.token.split(" ")[1];
  if (!token)
    return next(new HandleError("your not logged try to login please ", 402));
  const verify = jwt.verify(token, process.env.SECRET_JWT, (err, dec) => {
    if (err) return next(new HandleError(err.message, 402));
    decUser = dec;
  });
  //2.2) find him in data base with decUser.id
  let user = await userModel.findById(decUser.id);
  // 2.3) check if the data input is correct
  try {
    const validation = await validUpdate(req.body);
    // 2.3) check if email exict before in db
    const checkEmail = await userModel.findOne({ email: req.body.eamil });
    if (checkEmail) return next(new HandleError("email existed before", 402));
    //3) updating
    user.name = req.body.name;
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

module.exports = { updateMe };
