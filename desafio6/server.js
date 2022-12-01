const Contenedor = require("./Handlers/Contenedor.js");
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { isPromise } = require("util/types");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
//PLANTILLAS
app.set("view engine", "ejs");

const productosContenedor = new Contenedor("productos.txt");
const mensajesContenedor = new Contenedor("mensajes.txt");
