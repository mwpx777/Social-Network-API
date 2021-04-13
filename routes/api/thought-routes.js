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

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)
    

// /api/thoughts/<userId>
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);


    
router.route('/:thoughtId').post(addReaction)
router.route('/:thoughtId/:reactionId').delete(removeReaction)

// /api/thoughts/<userId>/<thoughtId>/<replyId>
// router.route('/:userId/:thoughtId/:replyId').delete(removeReaction);




module.exports = router;
