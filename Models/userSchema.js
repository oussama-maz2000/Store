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
  },
  { timestamps: true }
);

const userModel = mongoose.model("usermodel", userSchema);
module.exports = { userModel };
