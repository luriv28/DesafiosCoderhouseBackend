import { SqlContainer } from "./models/SqlContainer.js";
import Contenedor from "./models/Contenedor.js";
import { optionsSql, optionsSqlite } from "./dbOptions/sqlConnection.js";
import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { getProducts } from "./mocks/products.js";
//// NORMALIZR
import util from "util";
function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}
/////
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));
//PLANTILLAS
app.set("view engine", "ejs");

const productosContenedor = new SqlContainer(optionsSql, "products");
//const mensajesContenedor = new SqlContainer(optionsSqlite, "messages");
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
app.get("/productos-test", async (req, res) => {
  try {
    const productos = getProducts(5);
    res.render("index", {
      pageTitle: "Desafio 09 - Faker/Normalizacion",
      productos: productos,
    });
  } catch (error) {
    console.log(error);
  }
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
