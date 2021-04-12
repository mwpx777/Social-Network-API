const router = require('express').Router();
// destructure the method names out of the imported object and use the names directly
const {
    getAllUsers,
    getUserById,
    postNewUser,
    updateUserById,
    deleteUserById
  } = require('../../controllers/user-controller');

// set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(postNewUser);

// set up GET one, PUT and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);


// /api/users/:userId/friends/:friendId

module.exports = router;