const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  console.log("validating data:")
  const validSchema = pick(schema, ['params', 'query', 'body']);
  console.log(Object.keys(validSchema) ,  "...keys");
  console.log(Object.keys(schema) ,  "...valid schema");
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

    console.log(value )
  if (error) {
    res.status(400).json({ status: false, response: { message: error.message } });
    return;
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;