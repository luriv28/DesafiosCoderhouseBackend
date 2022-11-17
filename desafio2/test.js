const Contenedor = require("./main.js");

const products = new Contenedor("products.txt");

const main = async () => {
  const contenedor = new Contenedor("productos.txt");
  await contenedor.save({
    Title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  });
  await contenedor.save({
    Title: "Calculadora",
    price: 243.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  });
  await contenedor.save({
    Title: "Globo Terraqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  });

  const id = 2;
  //await contenedor.getById(id);
  //const products = await contenedor.getAll();
  console.log("Array de objetos", products);
  //await contenedor.deleteById();
  //await contenedor.deleteAll();
};

main();
