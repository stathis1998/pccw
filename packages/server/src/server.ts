import express from "express";
import cors from "cors";

import sequelize from "./config/db";
import { runAssosiacion } from "./config/associations";
import { logger } from "./utils/logger";
import { getEnvironmentVariable } from "./utils/enviroment";

import { Server } from "socket.io";
import { createServer } from "http";

import authRoutes from "./api/routes/authRoutes";

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = getEnvironmentVariable("PORT");
const corsOrigin = getEnvironmentVariable("CORS_ORIGIN");

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

app.use("/api/auth", authRoutes);

io.on("connection", (socket) => {
  logger.info("a user connected");
  socket.on("disconnect", () => {
    logger.info("user disconnected");
  });
});

sequelize
  .sync({ force: false })
  .then(() => {
    logger.info("Connected to the database");

    runAssosiacion();

    server.listen(port, () => {
      logger.info(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    logger.error(`Unable to connect to the database: ${error}`);
  });
