const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

//  /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

// /api/users/<userId>/thoughts 
// router.route('/:userId/thoughts').post(addThought)


// /api/thoughts/<thoughtId>
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/<thoughtId>/reactions
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);


// router.route('/:thoughtId').post(addReaction)
// router.route('/:thoughtId/:reactionId').delete(removeReaction)

// /api/thoughts/<userId>/<thoughtId>/<replyId>
// router.route('/:userId/:thoughtId/:replyId').delete(removeReaction);




module.exports = router;
