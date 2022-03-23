const joi = require("joi");

const productVerify = async (data) => {
  const schema = joi.object({
    id: joi.number().required(),
    title: joi.alphanum().min(5).required(),
    price: joi.number().required(),
    category: joi.string().required(),
    description: joi.string(),
    image: joi.string().required(),
    available: joi.boolean(),
  });
  return await schema.validate(data);
};

module.exports = { productVerify };
