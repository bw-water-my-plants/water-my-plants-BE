const router = require('express').Router();
const authRouter = require('./authRoot');
const plantsRouter = require('./plantsRoot');
const usersRouter = require('./usersRoot');

router.use('/auth', authRouter);
router.use('/plants', plantsRouter);
router.use('/users', usersRouter);

module.exports = router;
