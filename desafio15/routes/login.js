import { Router } from "express";
import {
  getLogin,
  postLogin,
  getLoginError,
  getRegister,
  getRegisterError,
  getLogout,
} from "../handlers/loginHandlers.js";
import passport from "passport";
import { loginStrategy, registerStrategy } from "../passportConfig/passport.js";

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

const loginRouter = Router();

loginRouter.get("/login", getLogin);
loginRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginError" }),
  postLogin
);
loginRouter.get("/loginError", getLoginError);

loginRouter.get("/register", getRegister);
loginRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/registerError",
    successRedirect: "/login",
  })
);
loginRouter.get("/registerError", getRegisterError);

loginRouter.get("/logout", getLogout);

export default loginRouter;
