import { existsSync, readFileSync, writeFileSync, promises } from "fs";
import { normalize, schema } from "normalizr";
import util from "util";

function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

export default class Contenedor {
  nextId;
  arrayObj = new Array();

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    if (existsSync(nombreArchivo)) {
      console.log("Existen objetos, importandolos...");
      this.arrayObj = JSON.parse(readFileSync(this.nombreArchivo, "utf-8"));
      this.nextId = this.#getNextId();
    } else {
      console.log("No existe archivo de objetos, creandolo...");
      this.nextId = 0;
      writeFileSync(this.nombreArchivo, JSON.stringify(this.arrayObj));
    }
  }

  async save(object) {
    try {
      object["id"] = this.nextId;
      this.arrayObj.push(object);
      await promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.arrayObj)
      );
      this.nextId++;
      return Promise.resolve(object.id);
    } catch (err) {
      console.log(err);
    }
  }

  getById(id) {
    let obj = null;
    this.arrayObj.map((element) => {
      if (element.id == id) {
        obj = element;
      }
    });
    return obj;
  }

  async update(id, newObject) {
    let index = this.#IdExists(id);
    if (index) {
      this.arrayObj[index] = { ...newObject, id: id };
      await promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.arrayObj)
      );
      return Promise.resolve(id);
    } else {
      console.log("No existe el ID");
    }
  }

  #isInFile(obj) {
    let response = false;
    this.arrayObj.forEach((element) => {
      if (
        element.title == obj.title &&
        element.price == obj.price &&
        element.thumbnail == obj.thumbnail
      ) {
        response = true;
      }
    });
    return response;
  }

  #IdExists(id) {
    let response = false;
    this.arrayObj.forEach((element, index) => {
      if (element.id == id) {
        response = index;
      }
    });
    return response;
  }

  #getNextId() {
    if (this.arrayObj.length > 0) {
      let maxId = this.arrayObj.reduce((acc, current) => {
        return Math.max(acc, current.id);
      }, 0);
      return maxId + 1;
    } else {
      return 0;
    }
  }

  #normalizeAll(obj) {
    this.dataToNormalize = {
      id: "backendCoder09",
      messages: obj,
    };
    // SCHEMAS
    this.authorSchema = new schema.Entity(
      "author",
      {},
      { idAttribute: "email" }
    );
    this.messageSchema = new schema.Entity("message", {
      author: this.authorSchema,
    });
    this.messagesSchema = new schema.Entity("messages", {
      messages: [this.messageSchema],
    });
    return normalize(this.dataToNormalize, this.messagesSchema);
  }

  async getAll() {
    try {
      const data = await promises.readFile(this.nombreArchivo, "utf-8");
      this.arrayObj = JSON.parse(data);
      return this.arrayObj;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllNormalized() {
    try {
      const data = await promises.readFile(this.nombreArchivo, "utf-8");
      return this.#normalizeAll(JSON.parse(data));
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    let flag = false;
    for (let i = 0; i < this.arrayObj.length; i++) {
      if (this.arrayObj[i].id === id) {
        flag = true;
        this.arrayObj.splice(i, 1);
        i--;
      }
    }
    //console.log ("flag: " + flag)
    if (flag) {
      try {
        await promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(this.arrayObj)
        );
        console.log("borro");
        return id;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No se borro objeto pq no existe el ID");
      return null;
    }
  }

  async deleteAll() {
    this.arrayObj = [];
    try {
      await promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.arrayObj)
      );
      console.log("borro todo");
    } catch (err) {
      console.log(err);
    }
  }
}
