import models from "../models";

const { Posts, Reactions } = models;
const getPosts = async () => {
  return await Posts.findAll({
    include: [Reactions],
  });
};

const getSinglePost = async (id) => {
  const singlePost = await Posts.findOne({
    where: { id },
    include: [{ model: Reactions, order: [Reactions, "createdAt", "ASC"] }],
  });
  if (!singlePost || !singlePost.dataValues.id) {
    return null;
  }
  return singlePost.dataValues;
};

const createPost = async (post, userId) => {
  const postCreated = await Posts.create(
    {
      post,
      userId,
    },
    {
      returning: true,
      hooks: false,
    }
  );
  return postCreated.dataValues;
};

const deletePost = async (id, userId) => {
  const postExist = await Posts.findOne({
    where: { id },
  });
  if (!postExist || !postExist.dataValues.id) {
    return null;
  }
  if (postExist && postExist.dataValues.userId !== userId) {
    return "Not allowed";
  }
  const postDeleted = await Posts.destroy({
    where: {
      id,
    },
  });
  return postDeleted;
};

const commentPost = async (postId, userId, comment) => {
  const postExist = await Posts.findOne({
    where: { id: postId },
  });
  if (!postExist || !postExist.dataValues.id) {
    return null;
  }
  const postComment = await Reactions.create(
    {
      type: "comment",
      postId,
      value: comment,
      userId,
    },
    {
      returning: true,
      hooks: false,
    }
  );
  return postComment.dataValues;
};

const likePost = async (postId, userId) => {
  const postExist = await Posts.findOne({
    where: { id: postId },
  });
  if (!postExist || !postExist.dataValues.id) {
    return null;
  }
  const postLiked = await Reactions.create(
    {
      type: "like",
      postId,
      value: "like",
      userId,
    },
    {
      returning: true,
      hooks: false,
    }
  );
  return postLiked.dataValues;
};

export default {
  getPosts,
  createPost,
  getSinglePost,
  deletePost,
  commentPost,
  likePost,
};
