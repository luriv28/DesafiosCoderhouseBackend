import express from "express";
import { mongoContainer } from "../models/mongoContainer.js";
import { users } from "../models/schemas/users.js";
import passport from "passport";
import {
  loginStrategy,
  registerStrategy,
} from "../controllers/users/usersHandlers.js";
import { postUser } from "../controllers/users/usersHandlers.js";
import { upload } from "../helpers/filesUtils.js";

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

const { Router } = express;
const userRouter = Router();

export const userContainer = new mongoContainer(users);

userRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginError" }),
  postUser
);

userRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/registerError" }),
  postUser
);

//Deberia funcionar (Solo MULTER para subir)

userRouter.post(
  "/register2",
  upload.single("userPicture"),
  passport.authenticate("register", { failureRedirect: "/registerError" }),
  postUser
);

userRouter.get("/logout"); // hacer logout

export default userRouter;
