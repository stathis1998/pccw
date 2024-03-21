import winston from "winston";

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.Console(),
  ],
  silent: process.env.NODE_ENV === "production",
});
