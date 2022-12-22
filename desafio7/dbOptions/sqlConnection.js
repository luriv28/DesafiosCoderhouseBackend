export const optionsSql = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "coder_desafio_7",
  },
};

export const optionsSqlite = {
  client: "sqlite3",
  connection: {
    filename: "./db/messages.sqlite",
  },
  useNullAsDefault: true,
};
