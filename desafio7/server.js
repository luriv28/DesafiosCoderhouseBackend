import { SqlContainer } from "./models/SqlContainer.js";
import { optionsSql, optionsSqlite } from "./dbOptions/sqlConnection.js";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
//PLANTILLAS
app.set("view engine", "ejs");

const productosContenedor = new SqlContainer(optionsSql, "products");
const mensajesContenedor = new SqlContainer(optionsSqlite, "messages");

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
