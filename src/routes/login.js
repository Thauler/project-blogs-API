const router = require('express').Router();

const loginController = require('../controllers/login');
// const loginMiddleware = require('../middlewares/login');

router.post('/', loginController.login);

module.exports = router;