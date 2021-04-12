const router = require('express').Router();
const {
    getAllThoughts,
    getAllThoughtsById,
    addThought,
    removeThought,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// /api/thoughts/<userId>
router.route('/:userId')
    .get(getAllThoughtsById)
    

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(addReply)
  .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<replyId>
router.route('/:userId/:thoughtId/:replyId').delete(removeReply);


// /api/thoughts/:thoughtId/reactions

module.exports = router;
