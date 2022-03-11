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
    console.log(err.message);
  }
});
module.exports = route;
