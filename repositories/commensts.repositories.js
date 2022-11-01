const { Comments } = require('../models');

class CommentRepository {
  findAllComment = async (userId) => {
    const comments = Comments.findAll(
      { where: { userId } },
      { order: [['createdAt', 'DESC']] }
    );
    return comments;
  };

  createComment = async (diaryId, userId, comment) => {
    const createCommentData = await Comments.create({
      diaryId,
      userId,
      // name,
      comment,
    });
    return createCommentData;
  };

  updateComment = async (commentId, userId, comment) => {
    const updateCommentData = await Comments.update(
      { comment: comment },
      { where: { commentId, userId } }
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, userId) => {
    const deleteCommentData = await Comments.destroy({
      where: { commentId, userId },
    });
    return deleteCommentData;
  };
}
module.exports = CommentRepository;
