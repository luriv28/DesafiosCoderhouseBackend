import { SqlContainer } from "./models/SqlContainer.js";
import Contenedor from "./models/Contenedor.js";
import { optionsSql, optionsSqlite } from "./dbOptions/sqlConnection.js";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { getProducts } from "./mocks/products.js";
//// DESAFIO 11
import MongoStore from "connect-mongo";
import passport from "passport";
import { User } from "./dbOptions/db.js";
import session from "express-session";
import { loginStrategy, registerStrategy } from "./passportConfig/passport.js";
import { genPassword } from "./lib/passwordUtils.js";
import { isAuth } from "./routes/authMiddleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

const MongoAdvancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const sessionStore = MongoStore.create({
  mongoUrl:
    "mongodb+srv://acbruschini:acbruschinipassword@backendcluster.zqrgpto.mongodb.net/desafio11?retryWrites=true&w=majority",
  mongoOptions: MongoAdvancedOptions,
  ttl: 600,
});

app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
  })
);
///
app.use(passport.initialize());
app.use(passport.session());

//// NORMALIZR
import util from "util";
function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}
/////
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.static("./public"));

//PLANTILLAS
app.set("view engine", "ejs");

const productosContenedor = new SqlContainer(optionsSql, "products");
const mensajesContenedor = new Contenedor("mensajes.txt");

//GET
app.get("/productos", async (req, res) => {
  try {
    const productos = await productosContenedor.getAll();
    res.render("index", {
      pageTitle: "Desafio 06 - Ejs",
      productos: productos,
    });
  } catch (error) {
    console.log(error);
  }
});

//GET PRODUCTOS-TEST (FAKER)
app.get("/productos-test", isAuth, async (req, res) => {
  try {
    const productos = getProducts(5);
    res.render("index", {
      pageTitle: "Desafio 09 - Faker/Normalizacion",
      productos: productos,
      partial: "./partials/desafio06",
      user: req.user,
    });
  } catch (error) {
    console.log(error);
  }
});

// ----------- LOGIN
app.get("/login", (req, res) => {
  req.isAuthenticated()
    ? res.redirect("/productos-test")
    : res.render("index", {
        pageTitle: "Desafio 09 - Faker/Normalizacion",
        partial: "./partials/login",
      });
});

app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/loginError" }),
  (req, res) => {
    console.log(req.user);
    res.redirect("/productos-test");
  }
);

app.get("/loginError", (req, res) => {
  res.render("index", {
    pageTitle: "Desafio 09 - Faker/Normalizacion",
    partial: "./partials/messageWindow",
    title: "Error",
    message: "We have in error in the Login, try again",
  });
});

// ------------ REGISTER

app.get("/register", (req, res) => {
  res.render("index", {
    pageTitle: "Desafio 09 - Faker/Normalizacion",
    partial: "./partials/register",
  });
});

app.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/registerError",
    successRedirect: "/login",
  })
);

app.get("/registerError", (req, res) => {
  res.render("index", {
    pageTitle: "Desafio 09 - Faker/Normalizacion",
    partial: "./partials/messageWindow",
    title: "Error",
    message: "The user already exists",
  });
});

// ------------- LOGOUT

app.get("/logout", (req, res) => {
  req.logout((err) => {});
  res.redirect("/login");
});

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");
  const productos = getProducts(5);
  const mensajes = await mensajesContenedor.getAllNormalized();
  // print(mensajes);
  socket.emit("productos", productos);
  socket.emit("messages", mensajes);

  socket.on("newProduct", async (data) => {
    io.sockets.emit("productos", getProducts(productos.length++));
  });
  socket.on("newMessage", async (data) => {
    await mensajesContenedor.save(data);
    console.log(data);
    io.sockets.emit("messages", await mensajesContenedor.getAllNormalized());
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));
