import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { collection: "users" }
);

const connection = mongoose.createConnection(
  process.env.USERSDB_MONGO_STRINGCONN,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export const User = connection.model("User", UserSchema);
