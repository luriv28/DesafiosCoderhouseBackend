import ProductsRepo from "../repos/products.js";

const productsR = new ProductsRepo();

export class ProductsServices {
  async getProductos() {
    const products = await productsR.getAll();
    return products;
  }

  async getProductById(id) {
    const product = await productsR.getById(id);
    return product ? product : {};
  }

  async postProducto(newProduct) {
    const product = await productsR.save(newProduct);
    return product.id;
  }

  async deleteProducto(id) {
    const deletedId = await productsR.deleteById(id);
    return deletedId;
  }

  async updateProduct(id, data) {
    try {
      const oldProduct = await productsR.getById(id);
      const updatedProduct = { ...oldProduct, ...data };
      const updated = await productsR.update(id, updatedProduct);
      return updated;
    } catch (error) {}
  }
}
