//import { optionsSql } from "../dbOptions/sqlConnection.js";
import knex from "knex";

export class SqlContainer {
  constructor(options, table) {
    this.options = options;
    this.table = table;
  }

  #connectDb() {
    return (this.sql = knex(this.options));
  }

  async #destroyDb() {
    return await this.sql.destroy();
  }

  async save(object) {
    // WHEN ERROR, UNDEFINED IS RETURNED
    try {
      this.#connectDb();
      return await this.sql(this.table).insert(object);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async getById(id) {
    // WHEN NO ROW IS FOUND RETURNS EMPTY ARRAY
    try {
      this.#connectDb();
      return await this.sql(this.table).select("*").where("id", "=", id);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async update(id, newObject) {
    // RETURNS QUANTITY OF ROWS AFFECTED
    try {
      this.#connectDb();
      return await this.sql(this.table).where("id", "=", id).update(newObject);
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async getAll() {
    // RETURNS ALL ROWS IN ARRAY, EMPTY WHEN EMPTY TABLE
    try {
      this.#connectDb();
      return await this.sql(this.table).select("*");
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async deleteById(id) {
    // RETURNS QUANTITY OF ROWS AFFECTED
    try {
      this.#connectDb();
      return await this.sql(this.table).where("id", "=", id).del();
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async deleteAll() {
    // RETURNS AND OBJECT WHEN SUCCESS
    try {
      this.#connectDb();
      return await this.sql(this.table).truncate();
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  // SCRIPTS TO CREATE NEDDED TABLES
  async createMessagesTable() {
    try {
      this.#connectDb();
      await this.sql.schema.createTable("messages", (table) => {
        table.increments("id").primary();
        table.string("dateAndTime", 100).notNullable();
        table.string("email", 50).notNullable();
        table.string("message", 200).notNullable();
      });
      return "Messages table was created";
    } catch (error) {
      console.log(error);
    } finally {
      await this.#destroyDb();
    }
  }

  async createProductsTable() {
    try {
      this.#connectDb();
      await this.sql.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("title", 100).notNullable();
        table.float("price").notNullable();
        table.string("thumbnail", 200).notNullable();
      });
    } catch (error) {
    } finally {
      await this.#destroyDb();
    }
  }
}

// const sql = new SqlContainer(optionsSql, "messages");
// console.log(await sql.deleteAll());

// const obj = [ {dateAndTime: Date.now(), email: "email1@gmail.com", message: "message1"}, {dateAndTime: Date.now(), email: "email2@gmail.com", message: "message2"}];
// const data = await sql.getAll();
// console.log(data)
