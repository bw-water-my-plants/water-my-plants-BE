const router = require('express').Router();
const usersController = require('../controllers/usersController');
const authentication = require('../middleware/authMiddleware');

router.route('/profile').get(authentication, usersController.getUser);
router.route('/profile').put(authentication, usersController.updateUser);
router.route('/profile').delete(authentication, usersController.deleteUser);

module.exports = router;
