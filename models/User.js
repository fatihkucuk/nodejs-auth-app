const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { USER_ROLES } = require('../constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 1,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  role: {
    type: String,
    enum: [USER_ROLES.ADMIN, USER_ROLES.USER],
    default: USER_ROLES.USER,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const validateRegistration = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(255).required(),
    email: Joi.string().min(1).max(255).email().lowercase().required(),
    password: Joi.string().min(6).max(1024).required(),
    role: Joi.string(),
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
module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
