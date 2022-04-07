const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema(
  
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    size: { type: [String], default: [38, 39, 40, 41] },
    category: { type: String },
    description: { type: String },
    image: { type: [ String ] },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const storeModel = mongoose.model("store", storeSchema);
module.exports = storeModel;
