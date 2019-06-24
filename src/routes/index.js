const router = require('express').Router();
const authRouter = require('./auth');
const plantsRouter = require('./plants');
const usersRouter = require('./users');

router.use('/auth', authRouter);
router.use('/plants', plantsRouter);
router.use('/users', usersRouter);

module.exports = router;
