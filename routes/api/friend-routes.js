const router = require('express').Router();

const {
    createFriend,
    deleteFriend

} = require('../../controllers/friend-controller');

router
    .route('/')
    
//   /api/friends/userId
// router.route('/:userId/friends/:id').post(createFriend)
// router.route('/:userId').post(createFriend)
router.route('/:userId').post(createFriend)

 

router
    .route('/:userId/friends/:friendId')  
    .delete(deleteFriend);

module.exports = router;
