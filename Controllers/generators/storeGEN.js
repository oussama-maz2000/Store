const express = require("express");
const router = express.Router();
const { protect, restrict } = require("../authentication/userAuthentication");
const { uplaod } = require("../helpers/upload");
const {
  get_All,
  insert_product,
  get_Shoes,
  get_Tshirt,
  get_jeans,
  product_byID,
  deleteOne,
  update_Data,
  get_By_category,
} = require("../Routers/storeRoute");

router.route("/").get(protect, get_All);
router
  .route("/insert")
  .post(protect, restrict("admin"), uplaod.single("image"), insert_product);
router
  .route("/:id")
  .delete(protect, restrict("admin"), deleteOne)
  .patch(protect, restrict("admin"), update_Data)
  .get(product_byID);
router.route("/shoes").get(get_Shoes);
router.route("/jeans").get(get_jeans);
router.route("/tshirt").get(get_Tshirt);
router.route("/:category").get(get_By_category);

module.exports = router;
