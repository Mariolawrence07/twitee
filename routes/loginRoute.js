import express from "express";
import userController from "../controller/userController";
import helperResponse from "../Helpers/helperResponse";

const router = express.Router();

/* GET home page. */
router.post("/", async function (req, res, next) {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password) {
    return helperResponse.clientError(
      res,
      "email and password field is required"
    );
  }
  const postUser = await userController.login({ email, password });
  if (!postUser) {
    return helperResponse.clientError(
      res,
      "Email or password is incorrect",
      400
    );
  }
  return helperResponse.requestSuccessful(res, postUser, 200);
});

export default router;
