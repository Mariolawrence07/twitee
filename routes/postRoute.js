import express from "express";
import helperResponse from "../Helpers/helperResponse";
import postController from "../controller/postController";
import Helper from "../Helpers/helpers";

const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const posts = await postController.getPosts();
    return helperResponse.requestSuccessful(res, posts, 200);
  } catch (error) {
    if (error.errors)
      return helperResponse.sequelizeValidationError(res, error);
    return helperResponse.serverError(res);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    if (!Helper.isValidNumber(id)) {
      return helperResponse.clientError(res, "please provide a valid post id");
    }
    const singlePost = await postController.getSinglePost(id);
    if (!singlePost) {
      return helperResponse.clientError(res, "post not found", 404);
    }
    return helperResponse.requestSuccessful(res, singlePost, 200);
  } catch (error) {
    if (error.errors)
      return helperResponse.sequelizeValidationError(res, error);
    return helperResponse.serverError(res);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { post } = req.body;
    const { id } = req.decoded;
    if (!post) {
      return helperResponse.clientError(res, "post field is required");
    }
    const create = await postController.createPost(post, id);
    return helperResponse.requestSuccessful(res, create, 201);
  } catch (error) {
    if (error.errors)
      return helperResponse.sequelizeValidationError(res, error);
    return helperResponse.serverError(res);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    if (!Helper.isValidNumber(id)) {
      return helperResponse.clientError(res, "please provide a valid post id");
    }
    const deletePost = await postController.deletePost(id, req.decoded.id);
    if (!deletePost) {
      return helperResponse.clientError(res, "post not found", 404);
    }
    if (deletePost === "Not allowed") {
      return helperResponse.clientError(
        res,
        "You can only delete the posts you created",
        401
      );
    }
    return helperResponse.requestSuccessful(
      res,
      { message: "post deleted sucessfully" },
      200
    );
  } catch (error) {
    if (error.errors)
      return helperResponse.sequelizeValidationError(res, error);
    return helperResponse.serverError(res);
  }
});

router.post("/comment/:id", async function (req, res, next) {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    const userId = req.decoded.id;
    if (!comment) {
      return helperResponse.clientError(res, "comment field is required");
    }
    if (!Helper.isValidNumber(id)) {
      return helperResponse.clientError(res, "please provide a valid post id");
    }
    const commentpost = await postController.commentPost(id, userId, comment);
    if (!commentpost) {
      return helperResponse.clientError(res, "post not found", 404);
    }
    return helperResponse.requestSuccessful(res, commentpost, 201);
  } catch (error) {
    if (error.errors)
      return helperResponse.sequelizeValidationError(res, error);
    return helperResponse.serverError(res);
  }
});

router.post("/like/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.decoded.id;
    if (!Helper.isValidNumber(id)) {
      return helperResponse.clientError(res, "please provide a valid post id");
    }
    const like = await postController.likePost(id, userId);
    if (!like) {
      return helperResponse.clientError(res, "post not found", 404);
    }
    return helperResponse.requestSuccessful(res, like, 201);
  } catch (error) {
    if (error.errors)
      return helperResponse.sequelizeValidationError(res, error);
    return helperResponse.serverError(res);
  }
});

export default router;
