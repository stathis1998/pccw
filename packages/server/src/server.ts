import express from "express";
import cors from "cors";

import sequelize from "./config/db";
import { runAssosiacion } from "./config/associations";
import { logger } from "./utils/logger";

const app = express();

const port = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN;

if (!port) {
  throw new Error("Port is not defined");
}

if (!corsOrigin) {
  throw new Error("CORS origin is not defined");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: corsOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

sequelize
  .sync({ force: true })
  .then(() => {
    logger.info("Connected to the database");

    runAssosiacion();

    app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    logger.error(`Unable to connect to the database: ${error}`);
  });
