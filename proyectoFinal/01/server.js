import express from "express";
import router from "./routes/index.js";

export const admin = false;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.use((req, res) => {
  res.json({
    error: -1,
    description: "Not an implemented route " + req.originalUrl,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening in ${PORT}`));
