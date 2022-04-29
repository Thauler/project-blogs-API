const loginService = require('../services/login');

const login = async (req, res) => {
  try {
    const result = await loginService.login(req.body);
    return res.status(result.code).json(result.message);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  login,
};