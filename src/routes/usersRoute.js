const router = require('express').Router();
const usersController = require('../controllers/usersController');

router.route('/profile').get(usersController.getUser);

module.exports = router;
