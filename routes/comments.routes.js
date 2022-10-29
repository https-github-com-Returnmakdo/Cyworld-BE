const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewares');

const CommentController = require('../controllers/commensts.controllers');
const commentController = new CommentController();

router.get('/:diaryId', commentController.getComment);
router.post('/:diaryId', authMiddleware, commentController.createComment);
router.put('/:commentId', authMiddleware, commentController.updataComment);
router.delete('/:commentId', authMiddleware, commentController.deleteComment);

module.exports = router;
