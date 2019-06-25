const router = require('express').Router();
const usersRouter = require('./usersRoute');
const authRouter = require('./authRoute');
const plantsRouter = require('./plantsRoute');

// router.use('/auth', authRouter);
router.use('/plants', plantsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;
