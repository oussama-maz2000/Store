const joi = require("joi");

const productVerify = async (data) => {
  const schema = joi.object({
    id: joi.number().required(),
    title: joi.string().min(5).required(),
    price: joi.string().required(),
    size: joi.array().items(joi.string()),
    category: joi.string().required().min(5),
    description: joi.string().min(5),
    image: joi.array().items(joi.string()),
    available: joi.boolean(),
    qty: joi.number().required(),
  });
  return schema.validate(data);
};

const update_product_Verify = async (data) => {
  const schema = joi.object({
    id: joi.number().required(),
    title: joi.string().min(5),
    price: joi.number(),
    size: joi.array().items(joi.string()),
    category: joi.string(),
    description: joi.string(),
    image: joi.array().items(joi.string()),
    available: joi.boolean(),
  });
  return schema.validate(data);
};

module.exports = { productVerify, update_product_Verify };
