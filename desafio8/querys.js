//use ecommerce
db.createCollection("mensajes");

db.createCollection("productos");
//1
db.mensajes.insertMany([
  {
    dateAndTime: Date.now(),
    email: "email1@gmail.com",
    message: "Mensaje 1",
  },
  {
    dateAndTime: Date.now(),
    email: "email2@gmail.com",
    message: "Mensaje 2",
  },
  {
    dateAndTime: Date.now(),
    email: "email3@gmail.com",
    message: "Mensaje 3",
  },
  {
    dateAndTime: Date.now(),
    email: "email4@gmail.com",
    message: "Mensaje 4",
  },
  {
    dateAndTime: Date.now(),
    email: "email5@gmail.com",
    message: "Mensaje 5",
  },
  {
    dateAndTime: Date.now(),
    email: "email6@gmail.com",
    message: "Mensaje 6",
  },
  {
    dateAndTime: Date.now(),
    email: "email7@gmail.com",
    message: "Mensaje 7",
  },
  {
    dateAndTime: Date.now(),
    email: "email8@gmail.com",
    message: "Mensaje 8",
  },
  {
    dateAndTime: Date.now(),
    email: "email9@gmail.com",
    message: "Mensaje 9",
  },
  {
    dateAndTime: Date.now(),
    email: "email10@gmail.com",
    message: "Mensaje 10",
  },
]);

db.productos.insertMany([
  { title: "Producto 1", price: 101, thumbnail: "http:/thumb.com/thumb1.jpg" },
  { title: "Producto 2", price: 125, thumbnail: "http:/thumb.com/thumb2.jpg" },
  { title: "Producto 3", price: 300, thumbnail: "http:/thumb.com/thumb3.jpg" },
  { title: "Producto 4", price: 950, thumbnail: "http:/thumb.com/thumb4.jpg" },
  { title: "Producto 5", price: 1200, thumbnail: "http:/thumb.com/thumb5.jpg" },
  { title: "Producto 6", price: 1500, thumbnail: "http:/thumb.com/thumb6.jpg" },
  { title: "Producto 7", price: 2300, thumbnail: "http:/thumb.com/thumb7.jpg" },
  { title: "Producto 8", price: 4500, thumbnail: "http:/thumb.com/thumb8.jpg" },
  { title: "Producto 9", price: 3200, thumbnail: "http:/thumb.com/thumb9.jpg" },
  {
    title: "Producto 10",
    price: 4990,
    thumbnail: "http:/thumb.com/thumb10.jpg",
  },
]);

//3
db.mensajes.find();
db.productos.find();
//4
db.mensajes.estimatedDocumentCount();
db.productos.countDocuments({});

//5A
db.productos.insertOne({
  title: "Producto 11",
  price: 3500,
  thumbnail: "http:/thumb.com/thumb11.jpg",
});
//5b1 Entendi que solo hay que traer el nombre del producto segun las proximas condiciones, en el caso que no sea asi, se saca el {title: true}
db.productos.find({ price: { $lt: 1000 } }, { title: true });
//5b2
db.productos.find({ price: { $gt: 1000, $lt: 3000 } }, { title: true });
//5b3
db.productos.find({ price: { $gt: 3000 } }, { title: true });
//5b4
db.productos.find({}, { title: true }).sort({ price: 1 }).limit(1).skip(2);

//5C
db.productos.updateMany({}, { $set: { stock: 100 } });
//5D
db.productos.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });
//5E
db.productos.deleteMany({ price: { $lt: 1000 } });

//6
db.createUser({
  user: "lucas",
  pwd: "qwerty123456",
  roles: [{ role: "read", db: "ecommerce" }],
});
