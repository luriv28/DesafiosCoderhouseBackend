import supertest from "supertest";
import { strict as assert } from "node:assert";
import { app } from "./server.js";

const req = supertest(app);

describe("Test de endpoint /Productos con Asserts", async function () {
  it("Get all products", async function () {
    const response = await req.get("/productos");
    assert.deepStrictEqual(true, Array.isArray(response._body));
  });

  it("Post a product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    const response = await req.post(`/productos`).send(newProduct);
    assert.deepStrictEqual(response.body, {
      id: response.body.id,
      ...newProduct,
    });
    await req.delete(`/productos/${response.body.id}`);
  });
  it("Update Product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    let response = await req.post(`/productos`).send(newProduct);
    let insertedProduct = response.body;
    insertedProduct.price = 4000;
    response = await req
      .put(`/productos/${insertedProduct.id}`)
      .send(insertedProduct);
    assert.deepStrictEqual(response.body, insertedProduct);
    await req.delete(`/productos/${response.body.id}`);
  });
  it("Delete a product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    let response = await req.post(`/productos`, newProduct);
    let insertedProduct = response.body;
    response = await req.delete(`/productos/${insertedProduct.id}`);
    assert.deepStrictEqual(response.body.deletedId, insertedProduct.id);
  });
});
