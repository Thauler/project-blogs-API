const Joi = require('joi');
const { BlogPost } = require('../models');
const { Category } = require('../models');

const validateBody = (body) =>
  Joi.object({
    title: Joi.string().required()
    .messages({
      'string.required': '"title" is required',
    }),
    content: Joi.string().required()
    .messages({
      'string.required': '"content" is required',
    }),
    categoryIds: Joi.array().required()
    .messages({
      'string.required': '"categoryIds" is required',
    }),
  }).validate(body);

const create = async ({ title, content, categoryIds }, userId) => {
  const { error } = validateBody({ title, content, categoryIds });

  if (error) return { code: 400, message: { message: error.message } };

  const categoriesExist = await Promise.all(categoryIds
  .map((categoryId) => Category.findOne({ where: { id: categoryId } })));
  console.log(categoriesExist);

  if (categoriesExist.includes(null)) {
    return { code: 400, message: { message: '"categoryIds" not found' } };
  }

  const newBlogPost = await BlogPost.create({ title, content, categoryIds });

  return { code: 201, message: { ...newBlogPost.dataValues, userId } };
};

module.exports = { create };