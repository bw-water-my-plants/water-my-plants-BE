const router = require('express').Router();
const usersController = require('../controllers/usersController');
const authentication = require('../middleware/authMiddleware');

router.route('/profile').get(authentication, usersController.getUser);

module.exports = router;
