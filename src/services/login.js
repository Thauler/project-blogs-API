require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateBody = (body) =>
  Joi.object({
    email: Joi.string().required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.required': '"email" is required',
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).max(6).required()
    .messages({
      'string.min': '"password" length must be 6 characters long',
      'string.required': '"password" is required',
    }),
  }).validate(body);

const login = async ({ email, password }) => {
  const { error } = validateBody({ email, password });

  if (error) return { code: 400, message: { message: error.message } };

  const userExist = await User.findOne({ where: { email } });

  if (!userExist) return { code: 400, message: { message: 'Invalid fields' } };

  const token = jwt.sign({ data: email }, process.env.JWT_SECRET, jwtConfig);

  return { code: 200, message: { token } };
};

module.exports = {
  login,
};