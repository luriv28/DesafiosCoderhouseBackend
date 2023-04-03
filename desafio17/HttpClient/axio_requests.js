import axios from "axios";

console.log("----- GET ALL PRODUCTS -----");

try {
  const response = await axios.get(`http://localhost:8080/productos`);
  console.log(response.data);
} catch (error) {
  console.log(error);
}

console.log("----- POST PRODUCT -----");

let response;

try {
  response = await axios.post(`http://localhost:8080/productos`, {
    title: "Axios Product",
    price: 30000,
    thumb: "http://www.axios.com/thumb.jpg",
  });
  console.log(response.data);
  response = await axios.post(`http://localhost:8080/productos`, {
    title: "Axios Product 2",
    price: 30000,
    thumb: "http://www.axios.com/thumb2.jpg",
  });
  console.log(response.data);
} catch (error) {
  console.log(error);
}

console.log("----- UPDATE PRODUCT -----");

try {
  const response2 = await axios.put(
    `http://localhost:8080/productos/${response.data.id}`,
    {
      title: response.data.title + " Updated",
      title: response.data.title,
      price: response.data.price,
      thumb: response.data.thumb,
    }
  );
  console.log(response2.data);
} catch (error) {
  console.log(error);
}

console.log("----- DELETE PRODUCT -----");

try {
  const response2 = await axios.delete(
    `http://localhost:8080/productos/${response.data.id}`
  );
  console.log(response2.data);
} catch (error) {
  console.log(error);
}
