require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });
try {
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.data } });

    req.userId = user.id;

    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };