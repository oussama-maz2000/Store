const route = require("express").Router();
const { storeModel } = require("../../Models/storeSchema");
const { HandleError } = require("../Error/HandleErr");
const {
  productVerify,
  update_product_Verify,
} = require("../validation/productValid");

const get_All = async (req, res, next) => {
  let data = await storeModel.find();
  if (!data) return next(new HandleError("no product found", 404));
  return res.status(201).json({ data: data });
  next();
};

const expensive_product = async (req, res, next) => {
  let data = await storeModel.find({ price: { $gte: 150 } });
  return res.status(200).send(data);
};
const cheap_product = async (req, res, next) => {
  let data = await storeModel.find({ price: { $lte: 150 } });
  return res.status(200).send(data);
};
const insert_product = async (req, res, next) => {
  const { error } = await productVerify(req.body);
  if (error) return next(new HandleError(error.details[0].message, 402));
  let new_data = await new storeModel(req.body);
  await new_data.save();
  return res.status(201).send("inserting successfully ...");
};

const get_Shoes = async (req, res, next) => {
  let data = await storeModel.find({ category: "Shoes" });
  return res.status(201).send(data);
};
const get_Tshirt = async (req, res, next) => {
  let data = await storeModel.find({ category: "T-shirt" });
  return res.status(201).send(data);
};

const get_jeans = async (req, res, next) => {
  let data = await storeModel.find({ category: "Jeans" });
  return res.status(201).send(data);
};

const product_byID = async (req, res, next) => {
  const id = req.params.id;
  let data = await storeModel.findOne(req.params);
  if (!data)
    return next(new HandleError(`no product with id =${req.params.id}`));
  res.status(200).json({ data });
};
const deleteOne = async (req, res, next) => {
  const id = req.params.id * 1;
  const element_deleting = await storeModel.findOne({ id });
  if (!element_deleting)
    return next(new HandleError(`id =${id} doesn't exist`));
  else {
    let deleting = await storeModel.deleteOne({ id });
  }
  res.status(200).send("deleting successfully ...");
};
const update = async (req, res, next) => {
  let body = req.body;
  //console.log(body);
  const id = req.params.id * 1;
  const element_updating = await storeModel.findOne({ id });
  console.log(element_updating);
  const { error } = await update_product_Verify(body);
  if (error) return next(new HandleError(error.details[0].message, 401));
  /*  else {
    await storeModel.findByIdAndUpdate(
      _id ,
      {
        title: req.body.title,
        price: req.body.price,
        size: req.body.size,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        available: req.body.available,
      }
    );
  }
  */ res.status(200).send("update successfully ...");
};

module.exports = {
  get_All,
  expensive_product,
  cheap_product,
  insert_product,
  get_Shoes,
  get_Tshirt,
  get_jeans,
  product_byID,
  deleteOne,
  update,
};
