const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  //userID: { type: mongoose.Schema.ObjectId, ref: "usermodel" },
  productId: { type: mongoose.Schema.ObjectId, ref: "store" },
  //total of all itmes
  total: { type: Number, required: true },
  qty: { type: Number, required: true },
});

const userModel = mongoose.model("orders", orderSchema);
