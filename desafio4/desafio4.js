const { Router } = require("express");
const express = require("express");
const multer = require("multer");
const Contenedor = require("./d2_contenedor.js");

app = express();

//declaracion de uso de json, direccion de elementos estaticos y urlencoded
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

const routerProducto = express.Router();

const c1 = new Contenedor("./productos.txt");

//Rutas

routerProducto.get("/", (req, res) => {
  c1.getAll().then((data) => {
    res.send(data);
  });
});

routerProducto.get("/:id", (req, res) => {
  c1.getById(Number(req.params.id)).then((data) => {
    if (data == undefined) {
      return res.send({ error: "producto no encontrado" });
    }
    res.send(data);
  });
});

routerProducto.post("/", (req, res) => {
  c1.save(req.body).then((id) => {
    req.body.id = id;
    res.send(`${JSON.stringify(req.body)}`);
  });
});

routerProducto.put("/:id", (req, res) => {
  c1.getById(Number(req.params.id)).then((producto) => {
    if (producto == undefined) {
      return res.send({ error: "producto no encontrado" });
    }
    productoNuevo = { ...req.body, id: Number(req.params.id) };
    c1.save(productoNuevo);
    res.send({ estado: "Producto Actualizado" });
  });
});

routerProducto.delete("/:id", (req, res) => {
  c1.getById(Number(req.params.id)).then((producto) => {
    if (producto == undefined) {
      return res.send({ error: "producto no encontrado" });
    }
    c1.deleteById(Number(req.params.id));
    res.send({ estado: "Producto eliminado" });
  });
});

//Fin Rutas

app.use("/api/productos", routerProducto);

const PORT = 8080;

const server = app.listen(PORT, (err) => {
  if (err) console.log("Ocurrio un error " + err);
  console.log("Escuchando en el servidor " + PORT);
});
