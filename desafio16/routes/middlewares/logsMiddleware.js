import { logger } from "../../configs/loggers.js";

export function logPetitions(req, res, next) {
  // AGREGO UNA FUNCION PARA PODER LOGUEAR EN DONDE NECESITE ERRORES
  req.logError = function (err) {
    logger.error(`The was an error: ${err}`);
  };
  // LOGUEO
  logger.info(`The requested route is ${req.url} with ${req.method} method`);
  next();
}

export function logNIPetitions(req, res, next) {
  logger.warn(
    `The requested route is ${req.url} with ${req.method} method is not implemented`
  );
  next();
}
