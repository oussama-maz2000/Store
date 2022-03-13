const route = require("express").Router();
const storeModel = require("../../Models/storeSchema");

route.get("/", async (req, res) => {
  try {
    let data = await storeModel.find();
    return res.status(201).json({ data: data });
  } catch (err) {
    res.status(500).send("we have error try letter please");
  }
});
route.post("/data", async (req, res) => {
  let client_data = req.body;
  try {
    let new_data = await new storeModel(client_data);
    await new_data.save();
    return res.status(201).send("good");
  } catch (err) {
    res.status(401).send(err.message);
  }
});

route.get("/shoes", async (req, res) => {
  try {
    let data = await storeModel.find({ category: "Shoes" });
    return res.status(201).send(data);
  } catch (err) {
    return res.status(501).send(err.message);
  }
});
route.get("/T-shirt", async (req, res) => {
  try {
    let data = await storeModel.find({ category: "T-shirt" });
    return res.status(201).send(data);
  } catch (error) {
    return res.status(501).send(err.message);
  }
});
module.exports = route;
