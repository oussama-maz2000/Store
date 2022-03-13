const route = require("express").Router();
const storeModel = require("../../Models/storeSchema");
const HandleError = require("../Error/HandleErr");

route.get("/", async (req, res, next) => {
  try {
    let data = await storeModel.find();
    return res.status(201).json({ data: data });
  } catch (err) {
    let error = new HandleError(401, err.message);
    next(error);
  }
});
route.post("/data", async (req, res, next) => {
  let client_data = req.body;
  try {
    let new_data = await new storeModel(client_data);
    await new_data.save();
    return res.status(201).send("good");
  } catch (err) {
    let error = new HandleError(401, err.message);
    next(error);
  }
});

route.get("/shoes", async (req, res, next) => {
  try {
    let data = await storeModel.find({ category: "Shoes" });
    return res.status(201).send(data);
  } catch (err) {
    let error = new HandleError(401, err.message);
    next(error);
  }
});
route.get("/T-shirt", async (req, res, next) => {
  try {
    let data = await storeModel.find({ category: "T-shirt" });
    return res.status(201).send(data);
  } catch (err) {
    let error = new HandleError(401, err.message);
    next(error);
  }
});
module.exports = route;
