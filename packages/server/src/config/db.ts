import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/pccw.sqlite",
  logging: process.env.NODE_ENV === "development",
});

export default sequelize;
