const express = require("express");
const router = express.Router();

const {
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
} = require("../Routers/storeRoute");

router.route("/").get(get_All);
router.route("/insert").post(insert_product);
router.route("/:id").delete(deleteOne).patch(update).get(product_byID);
router.route("/shoes").get(get_Shoes);
router.route("/jeans").get(get_jeans);
router.route("/tshirt").get(get_Tshirt);

module.exports = router;
