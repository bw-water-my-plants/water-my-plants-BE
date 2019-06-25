const router = require('express').Router();
const authentication = require('../middleware/authMiddleware');
const plantsController = require('../controllers/plantsController');

router.route('/').post(authentication, plantsController.createPlant);
router.route('/').get(authentication, plantsController.getAllPlants);
router.route('/:id').get(authentication, plantsController.getPlant);
router.route('/:id').put(authentication, plantsController.updatePlant);
router.route('/:id').delete(authentication, plantsController.updatePlant);

module.exports = router;
