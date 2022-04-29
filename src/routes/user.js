const router = require('express').Router();

const userController = require('../controllers/user');
const userMiddleware = require('../middlewares/authToken');

router.get('/', userMiddleware.validateToken, userController.findAll);
router.get('/:id', userMiddleware.validateToken, userController.findByPk);
router.post('/', userController.create);

module.exports = router;