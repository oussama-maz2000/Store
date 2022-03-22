const route = require("express").Router();
const storeModel = require("../../Models/storeSchema");
const { HandleError } = require("../Error/HandleErr");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
route.get(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find();
    return res.status(201).json({ data: data });
  })
);
route.get(
  "/expensive_product",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find({ price: { $gte: 150 } });
    return res.status(200).send(data);
    console.log(data);
  })
);
route.get(
  "/cheap_product",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find({ price: { $lte: 150 } });
    return res.status(200).send(data);
    console.log(data);
  })
);
route.post("/insertData", async (req, res, next) => {
  let client_data = req.body;
  try {
    let new_data = await new storeModel(client_data);
    await new_data.save();
    return res.status(201).send("good");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

route.get("/Shoes", async (req, res, next) => {
  try {
    let data = await storeModel.find({ category: "Shoes" });
    return res.status(201).send(data);
  } catch (err) {
    console.log(err.message);

    res.status(400).send(err.message);
  }
});
route.get("/T-shirt", async (req, res, next) => {
  try {
    let data = await storeModel.find({ category: "T-shirt" });
    return res.status(201).send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

route.get(
  "/jeans",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find({ category: "Jeans" });
    return res.status(201).send(data);
  })
);

route.get("/:id", async (req, res, next) => {

  try {
    let data = await storeModel.findOne(req.params);
    if (data) {
      res.status(201).send(data);
    } else {
      next(new HandleError(`${req.params.id} doesn't exist`, 401));
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
route.delete("/:id", async (req, res, next) => {
  const id = req.params;
  try {
    const delete_product = await storeModel.deleteOne(req.params);
    res.status(200).send("deleting successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
route.patch("/:id", async (req, res, next) => {
  let body = req.body;
  let { id } = req.params * 1;
  try {
    let update = await storeModel.findByIdAndUpdate(id, { $set: body });
    res.status(200).send("update successfully");
  } catch (err) {
    console.log(err.message);

    res.status(400).send(err.message);
  }
});

module.exports = route;
