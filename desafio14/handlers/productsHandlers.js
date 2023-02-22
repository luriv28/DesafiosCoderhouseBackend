import { getProducts } from "../mocks/products.js";

export function getProductosTest(req, res) {
  try {
    const productos = getProducts(5);
    res.render("index", {
      pageTitle: "Desafio 09 - Faker/Normalizacion",
      productos: productos,
      partial: "./partials/desafio06",
      user: req.user,
    });
  } catch (error) {
    req.logError(error);
  }
}
