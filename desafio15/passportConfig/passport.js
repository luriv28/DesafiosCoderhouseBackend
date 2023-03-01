import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../dbOptions/dbUsers.js";
import { validPasword, genPassword } from "../lib/passwordUtils.js";

const customFields = {
  usernameField: "us",
  passwordField: "pw",
};

async function LoginVerifyCallBack(username, password, done) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false);
    } else if (validPasword(password, user.hash, user.salt)) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
}

export const loginStrategy = new LocalStrategy(
  customFields,
  LoginVerifyCallBack
);

async function RegisterVerifyCallBack(username, password, done) {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      return done(null, false);
    } else {
      const { salt, hash } = genPassword(password);
      const newUser = new User({
        username: username,
        salt: salt,
        hash: hash,
      });
      await newUser.save();
      const userWithId = await User.findOne({ username: username });
      return done(null, userWithId);
    }
  } catch (error) {
    done(error);
  }
}

export const registerStrategy = new LocalStrategy(
  customFields,
  RegisterVerifyCallBack
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    user ? done(null, user) : null;
  } catch (error) {
    done(error);
  }
});
