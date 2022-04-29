const categoryService = require('../services/category');

const findAll = async (_req, res) => {
  try {
    const result = await categoryService.findAll();
    return res.status(result.code).json(result.message);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await categoryService.create(req.body);
    return res.status(result.code).json(result.message);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  create,
  findAll,
};