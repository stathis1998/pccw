import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";
import authService from "../services/authService";

class User extends Model {
  public username!: string;
  public password!: string;
}

User.init(
  {
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
    hooks: {
      async beforeCreate(user) {
        user.password = await authService.hashPassword(user.password);
      },
      async beforeUpdate(user) {
        if (user.changed("password")) {
          user.password = await authService.hashPassword(user.password);
        }
      },
    },
  }
);

export default User;
