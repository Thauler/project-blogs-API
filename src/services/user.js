const Joi = require('joi');
const { User } = require('../models');
// const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = process.env;

//   return newUser;
// };

// module.exports = { create };

const validateBody = (body) =>
  Joi.object({
    displayName: Joi.string().min(8)
    .messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
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

const create = async ({ displayName, email, password }) => {
  const { error } = validateBody({ displayName, email, password });

  if (error) return { code: 400, message: { message: error.message } };

  const userExist = await User.findOne({ where: { email } });

  if (userExist) return { code: 409, message: { message: 'User already registered' } };

  const newUser = await User.create({ displayName, email, password });

  return { code: 201, message: newUser };
};

module.exports = {
  create,
};