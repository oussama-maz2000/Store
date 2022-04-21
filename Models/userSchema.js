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
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    passwordRestToken: String,
    passwordRestExpires: Date,
  },
  { timestamps: true }
);
userSchema.methods.create_Rest_Password_token =  function() {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordRestToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log("passwordRestToken ",this.passwordRestToken);
  console.log('resetToken ',resetToken);
  this.passwordRestExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const userModel = mongoose.model("usermodel", userSchema);
module.exports = { userModel };
