const router = require('express').Router();

const blogpostController = require('../controllers/blogpost');
const blogpostMiddleware = require('../middlewares/authToken');

router.post('/', blogpostMiddleware.validateToken, blogpostController.create);

module.exports = router;