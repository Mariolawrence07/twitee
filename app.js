import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import auth from "./Helpers/auth";

import loginRouter from "./routes/loginRoute";
import registerRouter from "./routes/registerRoute";
import postRouter from "./routes/postRoute";

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/post", auth, postRouter);
app.get("/", (req, res) =>
  res.status(200).send({ message: "Welcome to Twitee" })
);
app.use("*", (req, res) =>
  res.status(404).send({ message: "route not found" })
);

export default app;
