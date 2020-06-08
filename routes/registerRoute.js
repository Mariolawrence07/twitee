import express from "express";
import userController from "../controller/userController";
import helperResponse from "../Helpers/helperResponse";

const router = express.Router();

/* GET home page. */
router.post("/", async function (req, res, next) {
  const user = req.body;
  if (!user.email || !user.password) {
    return helperResponse.clientError(
      res,
      "email and password field is required"
    );
  }
  const registerUser = await userController.signUp(user);
  if (!registerUser) {
    return helperResponse.clientError(
      res,
      "You are a registered user on this platform, kindly proceed to login",
      409
    );
  }
  return helperResponse.requestSuccessful(res, registerUser, 201);
});

export default router;
