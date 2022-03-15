const route = require("express").Router();
const storeModel = require("../../Models/storeSchema");
const { HandleError } = require("../Error/HandleErr");

route.get("/", async (req, res, next) => {
  try {
    let data = await storeModel.find();
    return res.status(201).json({ data: data });
  } catch (err) {
    let error = new HandleError(
      401,
      "something wrong happend try after 3 second please"
    );
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
    let error = new HandleError(
      401,
      " something wrong happend try after 3 second please"
    );
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
    let error = new HandleError(
      401,
      "something wrong happend try after 3 second please"
    );
    next(error);
  }
});
route.get("/:id", async (req, res, next) => {
  try {
    let data = await storeModel.findOne(req.params);
    if (data) {
      res.status(201).send(data);
    } else {
      res.status(401).send("sorry we don't have it ");
    }
  } catch (err) {
    let error = new HandleError(
      401,
      "something wrong happend try after 3 second please"
    );
    next(error);
  }
});
route.delete("/:id", async (req, res, next) => {
  const id = req.params;
  try {
    const delete_product = await storeModel.deleteOne(req.params);
    res.status(200).send("deleting successfully");
  } catch (err) {
    let error = new HandleError(301, "try again please");
    next(error);
  }
});
route.patch("/:id", async (req, res, next) => {
  let body = req.body;
  let {id} = req.params*1;
  console.log(body);

  try {
    let update = await storeModel.findByIdAndUpdate(id, { $set: body });
    res.status(200).send("update successfully");
  } catch (err) {
    console.log(err.message);
    let error = new HandleError(301, "you have problem");
    next(error);
  }
});
module.exports = route;
