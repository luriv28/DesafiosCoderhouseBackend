import MongoStore from "connect-mongo";
import * as dotenv from "dotenv";
dotenv.config();

const MongoAdvancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
export const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_DB_STRING_CONN,
  mongoOptions: MongoAdvancedOptions,
  ttl: 600,
});
