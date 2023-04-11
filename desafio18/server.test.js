import axios from "axios";
import { describe, it } from "mocha";
import { strict as assert } from "node:assert";
import { expect } from "chai";

describe("Test de endpoint /Productos con Asserts", async function () {
  it("Get all products", async function () {
    const response = await axios.get(`http://localhost:8080/productos`);
    assert.deepStrictEqual(true, Array.isArray(response.data));
  });

  it("Post a product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    const response = await axios.post(
      `http://localhost:8080/productos`,
      newProduct
    );
    assert.deepStrictEqual(response.data, {
      id: response.data.id,
      ...newProduct,
    });
    await axios.delete(`http://localhost:8080/productos/${response.data.id}`);
  });
  it("Update Product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    let response = await axios.post(
      `http://localhost:8080/productos`,
      newProduct
    );
    let insertedProduct = response.data;
    insertedProduct.price = 4000;
    response = await axios.put(
      `http://localhost:8080/productos/${insertedProduct.id}`,
      insertedProduct
    );
    assert.deepStrictEqual(response.data, insertedProduct);
    await axios.delete(`http://localhost:8080/productos/${response.data.id}`);
  });
  it("Delete a product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    let response = await axios.post(
      `http://localhost:8080/productos`,
      newProduct
    );
    let insertedProduct = response.data;
    response = await axios.delete(
      `http://localhost:8080/productos/${insertedProduct.id}`
    );
    assert.deepStrictEqual(response.data.deletedId, insertedProduct.id);
  });
});

describe("Test de endpoint /Productos con Assertions de CHAI", async function () {
  it("Get all products", async function () {
    const response = await axios.get(`http://localhost:8080/productos`);
    expect(Array.isArray(response.data)).to.eql(true);
  });

  it("Post a product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    const response = await axios.post(
      `http://localhost:8080/productos`,
      newProduct
    );
    expect(response.data).to.deep.equal({
      id: response.data.id,
      ...newProduct,
    });
    await axios.delete(`http://localhost:8080/productos/${response.data.id}`);
  });
  it("Update Product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    let response = await axios.post(
      `http://localhost:8080/productos`,
      newProduct
    );
    let insertedProduct = response.data;
    insertedProduct.price = 4000;
    response = await axios.put(
      `http://localhost:8080/productos/${insertedProduct.id}`,
      insertedProduct
    );
    expect(response.data).to.deep.equal(insertedProduct);
    await axios.delete(`http://localhost:8080/productos/${response.data.id}`);
  });
  it("Delete a product", async function () {
    const newProduct = {
      title: "Test Mocha Product",
      price: 30000,
      thumb: "http://www.axios.com/thumb.jpg",
    };
    let response = await axios.post(
      `http://localhost:8080/productos`,
      newProduct
    );
    let insertedProduct = response.data;
    response = await axios.delete(
      `http://localhost:8080/productos/${insertedProduct.id}`
    );
    expect(response.data.deletedId).to.deep.equal(insertedProduct.id);
  });
});
