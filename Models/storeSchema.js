
const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    size: [Number],
    category: { type: String },
    description: { type: String },
    image: { type: String },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const storeModel = mongoose.model("store", storeSchema);
module.exports = storeModel;
