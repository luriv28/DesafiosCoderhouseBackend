import UsersDAOMem from "../DAOs/usersDAO_mem.js";
import UsersDAOMongoose from "../DAOs/usersDAO_mongoose.js";
import { users } from "../schemas/users.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class UsersDAOFactory {
  constructor() {
    if (!UsersDAOFactory.instance) {
      UsersDAOFactory.instance = this;
    }
    return UsersDAOFactory.instance;
  }

  getDao() {
    switch (process.env.PERSISTENCE) {
      case "mongo":
        console.log("PERSISTENCE IN MONGO");
        return new UsersDAOMongoose(users);
        break;
      case "mem":
        console.log("PERSISTENCE IN MEMORY");
        return new UsersDAOMem();
        break;
      default:
        console.log("PERSISTENCE DEFAULT (MEMORY)");
        return new UsersDAOMem();
        break;
    }
  }
}
