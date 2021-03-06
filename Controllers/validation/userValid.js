const joi = require("joi");
const bcrypt = require("bcryptjs");
function check_Sign_up(data) {
  let schemaUser = joi.object({
    username: joi.string().alphanum().min(4).max(25).required(),
    email: joi
      .string()
      .email({
        tlds: { allow: ["com", "net", "fr", "org"] },
      })
      .required(),
    password: joi.string().required().min(5),
    role: joi.string(),
  });
  return schemaUser.validateAsync(data);
}

async function check_log_in(data) {
  let schemaUser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(5),
  });
  return schemaUser.validateAsync(data);
}

async function hashPassword(password) {
  var salt = bcrypt.genSaltSync(10);
  var hashpassword = bcrypt.hashSync(password, salt);
  return hashpassword;
}

async function compare(password, hashpassword) {
  return bcrypt.compare(password, hashpassword);
}

async function validPassword(data) {
  let validation_password = joi.object({
    password: joi.string().min(5).required(),
  });
  return validation_password.validateAsync(data);
}

async function validUpdate(data) {
  let valide = joi.object({
    username: joi.string().alphanum().min(4).max(25).required(),
    email: joi
      .string()
      .email({
        tlds: { allow: ["com", "net", "fr", "org"] },
      })
      .required(),
    role: joi.string(),
  });
  return valide.validateAsync(data);
}
module.exports = {
  check_log_in,
  check_Sign_up,
  compare,
  hashPassword,
  validPassword,
  validUpdate,
};
