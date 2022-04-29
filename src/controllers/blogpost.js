const blogpostServices = require('../services/blogpost');

const create = async (req, res) => {
  const result = await blogpostServices.create(req.body, req.userId);

  return res.status(result.code).json(result.message);
};

module.exports = { create };