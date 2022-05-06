const Joi = require('joi');
const { BlogPost,
  User,
  Category,
  PostsCategories,
} = require('../models');

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

  if (categoriesExist.includes(null)) {
    return { code: 400, message: { message: '"categoryIds" not found' } };
  }

  const newBlogPost = await BlogPost
  .create({ title, content, categoryIds, userId, published: new Date(), updated: new Date() });

  await Promise.all(categoryIds.map((id) => PostsCategories
  .create({ postId: newBlogPost.dataValues.id, categoryId: id }))); // victor hugo baum https://github.com/tryber/sd-016-b-project-blogs-api/blob/victor-schlichting-project-blogs-api/src/services/blogpost.js

  return { code: 201, message: { ...newBlogPost.dataValues, userId } };
};

const findAll = async () => {
  const getAll = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        through: { attributes: [] }, // victor hugo baum indicou um video https://www.youtube.com/watch?v=p83qrlaCRw4&ab_channel=HigoRibeiro
    },
    ],
  });
  return { code: 200, message: getAll };
};

module.exports = {
  create,
  findAll,
};