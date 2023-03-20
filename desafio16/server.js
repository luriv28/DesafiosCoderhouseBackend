// ENV VARIABLES
import * as dot from "./configs/config.js";
// ARG VARIABLES
import parseArgs from "minimist";
export const args = parseArgs(process.argv.slice(2));
// CORS
import cors from "cors";

import { sessionStore } from "./dbOptions/dbSessions.js";
import Contenedor from "./persistence/Contenedor.js";
import express from "express";
import compression from "compression";

// ROUTES
import messagesRouter from "./routes/messages.js";
import loginRouter from "./routes/login.js";
import productsRouter from "./routes/products.js";
import randomsRouter from "./routes/randoms.js";
import infoRouter from "./routes/info.js";

// SOCKET IO
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { getProducts } from "./mocks/products.js";

// SESSION
import passport from "passport";
import session from "express-session";

// CLUSTER
import cluster from "cluster";

// LOGGER
//import { logPetitions, logNIPetitions } from "./routes/middlewares/logsMiddleware.js";
import { logger } from "./configs/loggers.js";

const SERVERMODE = args.serverMode || "FORK";
export const PORT = args.port || 8080;

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
  app.use(cors());
  app.use(compression());
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

  //PLANTILLAS
  app.use(express.static("./public"));
  app.set("view engine", "ejs");

  const mensajesContenedor = new Contenedor("mensajes.txt");

  app.use(loginRouter);
  app.use(productsRouter);
  app.use("/api", randomsRouter);
  app.use(messagesRouter);
  //app.use(infoRouter);

  io.on("connection", async (socket) => {
    console.log("Nuevo usuario conectado");
    const productos = getProducts(5);
    let mensajes;
    try {
      mensajes = await mensajesContenedor.getAllNormalized();
    } catch (error) {
      logger.error(`Error in getting messages ${error}`);
    }
    // print(mensajes);
    socket.emit("productos", productos);
    socket.emit("messages", mensajes);

    socket.on("newProduct", async (data) => {
      io.sockets.emit("productos", getProducts(productos.length++));
    });
    socket.on("newMessage", async (data) => {
      try {
        await mensajesContenedor.save(data);
      } catch (error) {
        logger.error(`Error in saving messages ${error}`);
      }
      io.sockets.emit("messages", await mensajesContenedor.getAllNormalized());
    });
  });

  httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));
}
