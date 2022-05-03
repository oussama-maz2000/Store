const { userModel } = require("../../Models/userSchema");
const { HandleError } = require("../Error/HandleErr");

const updateMe = (req, res, next) => {
  // 1) create error if user post password data

  if (req.body.password)
    return next(
      new HandleError(
        "This route is not for password update please use /updateMyPassword ",
        401
      )
    );
  // 2)   
};

module.exports = { updateMe };
