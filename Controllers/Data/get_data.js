const route = require("express").Router();
const storeModel = require("../../Models/storeSchema");
const { HandleError } = require("../Error/HandleErr");
const {
  productVerify,
  update_product_Verify,
} = require("../validation/productValid");

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
route.get(
  "/",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find();
    if (!data) return next(new HandleError("no product found", 404));
    return res.status(201).json({ data: data });
  })
);
route.get(
  "/expensive_product",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find({ price: { $gte: 150 } });
    return res.status(200).send(data);
  })
);
route.get(
  "/cheap_product",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find({ price: { $lte: 150 } });
    return res.status(200).send(data);
  })
);
route.post(
  "/insertData",
  catchAsync(async (req, res, next) => {
    let client_data = req.body;
    const { error } = await productVerify(client_data);
    if (error) return next(new HandleError(error.details[0].message, 401));
    let new_data = await new storeModel(client_data);
    await new_data.save();
    return res.status(201).send("good");
  })
);

route.get(
  "/Shoes",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find({ category: "Shoes" });
    return res.status(201).send(data);
  })
);
route.get(
  "/T-shirt",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find({ category: "T-shirt" });
    return res.status(201).send(data);
  })
);

route.get(
  "/jeans",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.find({ category: "Jeans" });
    return res.status(201).send(data);
  })
);

route.get(
  "/:id",
  catchAsync(async (req, res, next) => {
    let data = await storeModel.findOne(req.params);
    if (!data)
      return next(new HandleError(`no product with id =${req.params.id}`));
    res.status(200).json({ data });
  })
);
route.delete(
  "/:id",
  catchAsync(async (req, res, next) => {
    const id = req.params;
    const element_deleting = await storeModel.findOne(id);
    if (!element_deleting)
      return next(new HandleError(`id =${id} doesn't exist`));
    else await storeModel.deleteOne(id);
    res.status(200).send("deleting successfully");
  })
);
route.patch(
  "/:id",
  catchAsync(async (req, res, next) => {
    let body = req.body;
    let { id } = req.params * 1;
    const { error } = await update_product_Verify(body);
    if (error) return next(new HandleError(error.details[0].message, 401));
    else {
      await storeModel.findByIdAndUpdate(id, { $set: body });
      res.status(200).send("update successfully");
    }
  })
);
route.get("/*", (req, res) => {
  res.status(400).send("fuck u");
});

module.exports = route;
