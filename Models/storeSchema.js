const mongoose = require("mongoose");
//const { userModel } = require("./userSchema");
const storeSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    title: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    size: { type: [String], default: [38, 39, 40, 41] },
    category: { type: String },
    description: { type: String },
    image: { type: [String] },
    available: { type: Boolean, default: true },
    by_user: { type: mongoose.Schema.ObjectId, ref: "usermodel" },
  },
  { timestamps: true }
);

/* storeSchema.pre("find", async function (next) {
  const userPromise = this.by_user.map(async (id) => {
    let user = await userModel.findById(id);
    console.log(user);
  });
  this.by_user = Promise.all(userPromise);

  next();
}); */

storeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "by_user",
    select: "-__v -updatedAt -createdAt -password ",
  });
  /* 
  * when you want populate multiple fild just do (this .populate({}).populate)
  * the virtual populate is :
  *                           storeSchema.virtual('nameField',{
  * ref:'',
  * forgienFiled:''
  * localField:''
  * })

  */
});

const storeModel = mongoose.model("store", storeSchema);
module.exports = { storeModel, storeSchema };
