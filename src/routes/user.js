const router = require('express').Router();

const userController = require('../controllers/user');
// const userMiddleware = require('../middlewares/user');

router.post('/', userController.create);

module.exports = router;