import { cartContainer } from "../../routes/cart.js";
import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../../models/schemas/users.js";
import { validPasword, genPassword } from "../../helpers/passwordUtils.js";
import { sendEmailRegistration } from "../../helpers/sendEmailUtils.js";

// STRATEGIES
const customFields = {
  usernameField: "userEmail",
  passwordField: "userPassword",
  passReqToCallback: true,
};

// LOGIN
async function LoginVerifyCallBack(req, userEmail, userPassword, done) {
  try {
    const user = await users.findOne({ email: userEmail });
    if (!user) {
      return done(null, false);
    } else if (validPasword(userPassword, user.hash, user.salt)) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
}

// REGISTER
async function RegisterVerifyCallBack(req, userEmail, userPassword, done) {
  const { userName, userAddress, userAge, userPhone, userPicture } = req.body;
  try {
    const user = await users.findOne({ email: userEmail });
    if (user) {
      return done(null, false);
    } else {
      const newCart = { timestamp: Date.now(), productos: [] };
      const userCartId = (await cartContainer.save(newCart))._id.toString();
      const { salt, hash } = genPassword(userPassword);
      const newUser = new users({
        timestamp: Date.now(),
        nombre: userName,
        direccion: userAddress,
        edad: userAge,
        telefono: userPhone,
        foto: userPicture,
        carritoId: userCartId,
        email: userEmail,
        salt: salt,
        hash: hash,
      });
      await newUser.save();
      const userWithId = await users.findOne({ email: userEmail });

      // SAVE USER TO USE NEXT
      req.userData = userWithId;

      // SEND CONFIRMATION EMAIL
      sendEmailRegistration(`<h1>Nuevo registro</h1>
      <p>Datos<br>Nombre: ${userName}
      <br>Email: ${userEmail}
      </p>`);

      //RETURN OK
      return done(null, userWithId);
    }
  } catch (error) {
    done(error);
  }
}

// CREATE AND EXPORT STRATEGIES

export const loginStrategy = new Strategy(customFields, LoginVerifyCallBack);

export const registerStrategy = new Strategy(
  customFields,
  RegisterVerifyCallBack
);

// HANDLERS
export async function postUser(req, res) {
  res.redirect(303, "/");
}

// PASSPORT SERIAL DESERIAL
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await users.findById(userId);
    user ? done(null, user) : null;
  } catch (error) {
    done(error);
  }
});
