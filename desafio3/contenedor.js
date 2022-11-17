const fs = require("fs");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async getAll() {
    try {
      console.log(this.file);
      const data = await fs.promises.readFile(this.file, "utf-8");
      console.log(data);
      return JSON.parse(data);
    } catch (err) {
      console.log("Error en getAll: ", err);
    }
  }
  async save(product) {
    try {
      const data = await fs.promises.readFile(this.file, "utf-8");
      const products = JSON.parse(data);
      const lastId = products[products.length - 1].id;
      const newProduct = { ...product, id: lastId + 1 };
      products.push(newProduct);
      await fs.promises.writeFile(this.file, JSON.stringify(products, null, 2));
      console.log("Nuevo producto creado con id: " + newProduct.id);
    } catch (err) {
      const newProduct = { ...product, id: 1 };
      await fs.promises.writeFile(
        this.file,
        JSON.stringify([newProduct], null, 2)
      );
      console.log("Nuevo producto creado con id: " + newProduct.id);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      const product = products.find((product) => product.id === id);
      if (!product) {
        console.log("null");
      } else {
        console.log("Producto con id", id, product);
      }
    } catch (err) {
      throw new Error("No ha sido encontrado un producto con ese ID");
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();
      const product = products.find((product) => product.id === id);
      if (!product) {
        throw new Error("No ha sido encontrado un producto con ese ID");
      }
      const newProducts = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(
        this.file,
        JSON.stringify(newProducts, null, 2)
      );
    } catch (err) {
      console.log("Error en deleteById: ", err);
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, JSON.stringify([], null, 2));
    } catch (err) {
      console.log("Error en deleteAll: ", err);
    }
  }
}

module.exports = Contenedor;
