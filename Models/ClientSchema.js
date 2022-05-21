const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  number: { type: [Number], required: true },
  adress: { type: String, required: true },
});

const clientmodel = mongoose.model("client", clientSchema);
