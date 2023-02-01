import mongoose from "mongoose";

const connString =
  "mongodb+srv://acbruschini:acbruschinipassword@backendcluster.zqrgpto.mongodb.net/desafio11?retryWrites=true&w=majority";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { collection: "users" }
);

const connection = mongoose.createConnection(connString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const User = connection.model("User", UserSchema);
