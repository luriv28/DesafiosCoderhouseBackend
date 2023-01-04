import fs from "fs";

class Container {
  nextId;
  arrayObj = new Array();

  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    if (fs.existsSync(nombreArchivo)) {
      console.log("Existen productos, importandolos...");
      this.arrayObj = JSON.parse(fs.readFileSync(this.nombreArchivo, "utf-8"));
      this.nextId = this.#getNextId();
    } else {
      console.log("No existe archivo de productos, creandolo...");
      this.nextId = 0;
      fs.writeFileSync(this.nombreArchivo, JSON.stringify(this.arrayObj));
    }
  }

  async save(object) {
    try {
      object["id"] = this.nextId;
      this.arrayObj.push(object);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.arrayObj)
      );
      console.log("se guardo" + object.id);
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
      this.arrayObj[index] = { ...newObject, id: Number(id) };
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.arrayObj)
      );
      console.log("se actualizo");
      return Promise.resolve(id);
    } else {
      console.log("no existe el id");
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

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      this.arrayObj = JSON.parse(data);
      return this.arrayObj;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    let flag = false;
    for (let i = 0; i < this.arrayObj.length; i++) {
      if (this.arrayObj[i].id == id) {
        flag = true;
        this.arrayObj.splice(i, 1);
        i--;
      }
    }
    //console.log ("flag: " + flag)
    if (flag) {
      try {
        await fs.promises.writeFile(
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
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(this.arrayObj)
      );
      console.log("borro todo");
    } catch (err) {
      console.log(err);
    }
  }
}

export default Container;
