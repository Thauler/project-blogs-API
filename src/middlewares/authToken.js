require('dotenv').config();
const jwt = require('jsonwebtoken');
// const userService = require('../services/user');

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });
try {
    jwt.verify(authorization, process.env.JWT_SECRET);

    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };