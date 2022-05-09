const crypto = require("crypto");
const mongoose = require("mongoose");

// creation schma
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "your name should be great then 4 please"],
      maxlength: [25, "your name should be less then 25 please"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    passwordRestToken: String,
    passwordRestExpires: Date,
    isactive: {
      type: Boolean,
      default: true,
      select: false,
    },
    //     prducts: [{ type: mongoose.Schema.ObjectId, ref: "store" }],
  },
  { timestamps: true, select: false }
);
userSchema.methods.create_Rest_Password_token = function () {
  // the version that we send to client via email
  const resetToken = crypto.randomBytes(32).toString("hex");
  //the encryoted version of reset token
  this.passwordRestToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log("passwordRestToken ", this.passwordRestToken);
  console.log("resetToken ", resetToken);
  this.passwordRestExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre(/^find/, function (next) {
  this.find({ isactive: { $ne: false } });
  next();
});

const userModel = mongoose.model("usermodel", userSchema);
module.exports = { userModel };
