const router = require('express').Router();
const usersController = require('../controllers/usersController');
const authentication = require('../middleware/authMiddleware');

router.route('/').get(authentication, usersController.getUser);
router.route('/').put(authentication, usersController.updateUser);
router.route('/').delete(authentication, usersController.deleteUser);

module.exports = router;
