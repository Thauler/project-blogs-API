require('dotenv').config();
const Joi = require('joi');
const { Category } = require('../models');

const validateBody = (body) =>
  Joi.object({
    name: Joi.string().required()
    .messages({
      'string.required': '"name" is required',
    }),
  }).validate(body);

const create = async ({ name }) => {
  const { error } = validateBody({ name });

  if (error) return { code: 400, message: { message: error.message } };

  const newCategory = await Category.create({ name });

  return { code: 201, message: newCategory };
};

const findAll = async () => {
  const getAll = await Category.findAll();

  return { code: 200, message: getAll };
};

module.exports = {
  create,
  findAll,
};