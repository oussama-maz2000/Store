const mongoose = require("mongoose");
const storeSchema = new mongoose.Schema(
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
const storeModel = mongoose.model("store", storeSchema);
module.exports=storeModel
