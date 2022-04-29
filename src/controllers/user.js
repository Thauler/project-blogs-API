const userService = require('../services/user');

const findAll = async (_req, res) => {
  try {
    const result = await userService.findAll();
    return res.status(result.code).json(result.message);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const findByPk = async (req, res) => {
  try {
    const result = await userService.findByPk(req.params);
    return res.status(result.code).json(result.message);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await userService.create(req.body);
    return res.status(result.code).json(result.message);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  create,
  findAll,
  findByPk,
};