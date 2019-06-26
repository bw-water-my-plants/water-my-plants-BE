const router = require('express').Router();
const authentication = require('../middleware/authMiddleware');
const plantsController = require('../controllers/plantsController');

router.route('/').post(authentication, plantsController.createPlant);
router.route('/').get(authentication, plantsController.getAllPlants);
router.route('/:plant_id').get(authentication, plantsController.getPlant);
router.route('/:plant_id/height').get(authentication, plantsController.getPlantHeight);
router.route('/:plant_id/watered').get(authentication, plantsController.getPlantWatering);
router.route('/:plant_id').put(authentication, plantsController.updatePlant);
router.route('/:plant_id').delete(authentication, plantsController.deletePlant);

module.exports = router;
