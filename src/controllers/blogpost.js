const blogpostServices = require('../services/blogpost');

const findAll = async (req, res) => {
  try {
    const result = await blogpostServices.findAll();
  
    return res.status(result.code).json(result.message);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json(e.message);
  }
};

const create = async (req, res) => {
  const result = await blogpostServices.create(req.body, req.userId);

  return res.status(result.code).json(result.message);
};

module.exports = {
  create,
  findAll,
};