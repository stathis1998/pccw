import { Sequelize } from "sequelize";
import { getEnvironmentVariable } from "../utils/enviroment";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/pccw.sqlite",
  logging: getEnvironmentVariable("NODE_ENV") === "development",
});

export default sequelize;
