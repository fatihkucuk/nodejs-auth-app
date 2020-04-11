const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 1,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    min: 1,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 6,
    max: 1024,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const validateRegisteration = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(1).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
};

const validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(1).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(user);
};

module.exports.User = mongoose.model('User', userSchema);
module.exports.validateRegisteration = validateRegisteration;
module.exports.validateLogin = validateLogin;
