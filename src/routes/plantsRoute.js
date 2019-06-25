const router = require('express').Router();
const authentication = require('../middleware/authMiddleware');
const plantsController = require('../controllers/plantsController');

router.route('/').post(authentication, plantsController.createPlant);
router.route('/:id').get(authentication, plantsController.getPlant);

module.exports = router;
