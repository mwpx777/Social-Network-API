const router = require('express').Router();
// const friendRoutes = require('./friend-routes');
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// router.use('/friends', friendRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;