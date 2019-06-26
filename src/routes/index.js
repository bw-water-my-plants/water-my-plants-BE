const router = require('express').Router();
const apiRouter = require('./apiRoute');
const authRouter = require('./authRoute');
const plantsRouter = require('./plantsRoute');
const usersRouter = require('./usersRoute');

router.use('/', apiRouter);
router.use('/auth', authRouter);
router.use('/plants', plantsRouter);
router.use('/profile', usersRouter);

module.exports = router;
