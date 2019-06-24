const router = require('express').Router();
// const authRouter = require('./authRoute');
// const plantsRouter = require('./plantsRoute');
const usersRouter = require('./usersRoute');

// router.use('/auth', authRouter);
// router.use('/plants', plantsRouter);
router.use('/users', usersRouter);

module.exports = router;
