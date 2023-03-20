import ProductosRepo from "../repos/productosRepo.js";

const productosR = new ProductosRepo();

export async function getProductosTest(req, res) {
  try {
    const productos = await productosR.getAll();
    res.send(productos.map((m) => m.verProducto()));
  } catch (error) {
    req.logError(error);
  }
}
