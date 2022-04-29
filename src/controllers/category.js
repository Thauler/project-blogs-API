const categoryService = require('../services/category');

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
};