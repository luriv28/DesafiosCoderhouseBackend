import ProductosRepo from "../repos/productosRepo.js";

const productosR = new ProductosRepo();

export async function getProductos(req, res) {
  try {
    const productos = await productosR.getAll();
    res.send(productos.map((m) => m.verProducto()));
  } catch (error) {
    req.logError(error);
  }
}

export async function postProductos(req, res) {
  const { title, price, thumb } = req.body;
  try {
    const newProduct = await productosR.save({ title, price, thumb });
    res.json(newProduct.verProducto());
  } catch (error) {
    req.logError(error);
  }
}

export async function deleteProductos(req, res) {
  const { id } = req.params;
  try {
    const deleted = await productosR.deleteById(id);
    res.json({ deletedId: deleted });
  } catch (error) {
    req.logError(error);
  }
}

export async function updateProductos(req, res) {
  const { id } = req.params;
  const { title, price, thumb } = req.body;
  try {
    const updated = await productosR.update(id, { id, title, price, thumb });
    res.json(updated.verProducto());
  } catch (error) {
    req.logError(error);
  }
}
