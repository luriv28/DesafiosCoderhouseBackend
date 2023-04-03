// ----------- LOGIN
export function getLogin(req, res) {
  req.isAuthenticated()
    ? res.redirect("/productos-test")
    : res.render("index", {
        pageTitle: "Desafio 09 - Faker/Normalizacion",
        partial: "./partials/login",
      });
}

export function postLogin(req, res) {
  res.redirect("/productos-test");
}

export function getLoginError(req, res) {
  res.render("index", {
    pageTitle: "Desafio 09 - Faker/Normalizacion",
    partial: "./partials/messageWindow",
    title: "Error",
    message: "We have in error in the Login, try again",
  });
}

// ------------ REGISTER

export function getRegister(req, res) {
  res.render("index", {
    pageTitle: "Desafio 09 - Faker/Normalizacion",
    partial: "./partials/register",
  });
}

export function getRegisterError(req, res) {
  res.render("index", {
    pageTitle: "Desafio 09 - Faker/Normalizacion",
    partial: "./partials/messageWindow",
    title: "Error",
    message: "The user already exists",
  });
}

// ------------- LOGOUT

export function getLogout(req, res) {
  req.logout((err) => {
    req.logError(err);
  });
  res.redirect("/login");
}
