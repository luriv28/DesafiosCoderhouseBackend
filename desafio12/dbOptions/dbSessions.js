import MongoStore from "connect-mongo";

const MongoAdvancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
export const sessionStore = MongoStore.create({
  mongoUrl: process.env.SESSIONSDB_MONGO_STRINGCONN,
  mongoOptions: MongoAdvancedOptions,
  ttl: 600,
});
