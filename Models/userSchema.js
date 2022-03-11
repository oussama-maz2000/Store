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
    isadmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const storeSchem = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const userModel = mongoose.model("usermodel", userSchema);
const storeModel = mongoose.model("storemodel", storeSchem);
module.exports = { userModel, storeModel };
