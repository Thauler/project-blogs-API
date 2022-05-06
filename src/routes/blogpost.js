const router = require('express').Router();

const blogpostController = require('../controllers/blogpost');
const blogpostMiddleware = require('../middlewares/authToken');

router.get('/', blogpostMiddleware.validateToken, blogpostController.findAll);
router.post('/', blogpostMiddleware.validateToken, blogpostController.create);

module.exports = router;