import * as dotenv from "dotenv";
dotenv.config();

// LOGS
import { logger } from "./configs/loggers.js";

// ARG VARIABLES
import parseArgs from "minimist";
export const args = parseArgs(process.argv.slice(2));

// CLUSTER
import cluster from "cluster";

// EXPRESS
import express from "express";
import { router } from "./routes/index.js";

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

const SERVERMODE = args.serverMode || "FORK";
const PORT = args.port || process.env.PORT || 8080;

if (SERVERMODE === "CLUSTER" && cluster.isPrimary) {
  logger.info(`Master ${process.pid} esta corriendo`);

  for (let index = 0; index < 7; index++) {
    cluster.fork();

    cluster.on("exit", (worker, code, signal) => {
      logger.info(`worker ${worker.process.pid} termino`);
    });
  }
} else {
  app.listen(PORT, () => logger.info(`Listening in ${PORT}`));
}
