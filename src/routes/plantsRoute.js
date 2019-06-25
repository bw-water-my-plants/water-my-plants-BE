const router = require('express').Router();
const authentication = require('../middleware/authMiddleware');
const plantsController = require('../controllers/plantsController');

router.route('/plants').post(authentication, plantsController.createPlant);
router.route('/plants').get(authentication, plantsController.getPlant);

module.exports = router;
