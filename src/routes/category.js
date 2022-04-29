const router = require('express').Router();

const categoryController = require('../controllers/category');
const categoryMiddleware = require('../middlewares/authToken');

router.get('/', categoryMiddleware.validateToken, categoryController.findAll);
router.post('/', categoryMiddleware.validateToken, categoryController.create);

module.exports = router;