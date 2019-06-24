const router = require('express').Router();
const authController = require('../controllers/authController');

router.route('/login').post(authController.loginUser);
router.route('/register').post(authController.registerUser);

module.exports = router;
