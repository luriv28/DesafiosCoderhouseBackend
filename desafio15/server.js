// ENV VARIABLES
import * as dot from "./configs/config.js";
// ARG VARIABLES
import parseArgs from "minimist";
export const args = parseArgs(process.argv.slice(2));

import { sessionStore } from "./dbOptions/dbSessions.js";
import Contenedor from "./models/Contenedor.js";
import express from "express";

// ROUTES
import loginRouter from "./routes/login.js";
import productsRouter from "./routes/products.js";
import randomsRouter from "./routes/randoms.js";

// SOCKET IO
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { getProducts } from "./mocks/products.js";

// SESSION
import passport from "passport";
import session from "express-session";

// CLUSTER
import cluster from "cluster";
import { cpus } from "os";

const SERVERMODE = args.serverMode || "FORK";
export const PORT = process.env.PORT || args.port || 8080;
console.log(cpus().length);

if (SERVERMODE === "CLUSTER" && cluster.isPrimary) {
  console.log(`MAster ${process.pid} esta corriendo`);

  for (let index = 0; index < 7; index++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} termino`);
    });
  }
} else {
  SERVER();
}

function SERVER() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.EXPRESS_SESSION_SECRET,
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

  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);
  app.use(express.static("./public"));

  //PLANTILLAS
  app.set("view engine", "ejs");

  const mensajesContenedor = new Contenedor("mensajes.txt");

  app.use(loginRouter);
  app.use(productsRouter);
  app.use("/api", randomsRouter);

  // ------------- INFO

  app.get("/info", (req, res) => {
    res.send(`<h2>Argumentos de entrada: ${args}</h2>
  <h2>Sistema Operativo: ${process.platform}</h2>
  <h2>Version de Node: ${process.version}</h2>
  <h2>Memoria total reservada: ${process.memoryUsage().heapUsed}</h2>
  <h2>Path de Ejecucion: ${process.cwd()}</h2>
  <h2>Process ID: ${process.pid}</h2>
  <h2>Servidor escuchando en ${PORT} con Process id de ${
      process.pid
    } - ${new Date().toLocaleString()}</h2>
  <h2>Process ID: ${cpus().length}</h2>  
  <h2>Carpeta del proyecto: ${process.cwd().split("\\").pop()}</h2>`);
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

  httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));
}
