import winston from "winston";

export const logger = winston.createLogger({
  level: "warn",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "./logs/warn.log", level: "warn" }),
  ],
});
