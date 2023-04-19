const router = require('express').Router();
const auth = require('../middleware/auth');
const userController = require('../controllers/user.controller');

router.post('/', userController.login);

module.exports = router;
