const router = require('express').Router();
// destructure the method names out of the imported object and use the names directly
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// set up GET one, PUT and DELETE at /api/users/<userId>
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)


router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

// /api/users/:userId/friends/:friendId

module.exports = router;