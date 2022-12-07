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

//GET
app.get("/productos", async (req, res) => {
  try {
    const productos = await productosContenedor.getAll();
    res.render("index", {
      pageTitle: "Desafio6 - Ejs",
      productos: productos,
    });
  } catch (error) {
    console.log(error);
  }
});

io.on("connection", async (socket) => {
  console.log("Nuevo usuario conectado");
  const productos = await productosContenedor.getAll();
  const mensajes = await mensajesContenedor.getAll();
  socket.emit("productos", productos);
  socket.emit("messages", mensajes);

  socket.on("newProduct", async (data) => {
    await productosContenedor.save(data);
    io.sockets.emit("productos", await productosContenedor.getAll());
  });

  socket.on("newMessage", async (data) => {
    await mensajesContenedor.save(data);
    io.sockets.emit("messages", await mensajesContenedor.getAll());
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => console.log("Escuchando en puerto " + PORT));
